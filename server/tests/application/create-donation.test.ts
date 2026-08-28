import { test } from "node:test";
import assert from "node:assert/strict";
import { createDonationUseCase } from "../../src/application/create-donation.usecase.ts";
import { GatewayError } from "../../src/application/application.errors.ts";
import { ValidationError } from "../../src/domain/donation/donation.errors.ts";
import { Money } from "../../src/domain/shared/money.ts";
import { FakeClock } from "../fakes/fake-clock.ts";
import { FakeGateway } from "../fakes/fake-gateway.ts";
import { FakeLogger } from "../fakes/fake-logger.ts";
import { FakeRepository } from "../fakes/fake-repository.ts";

function setup() {
  const clock = new FakeClock(new Date("2026-08-25T12:00:00.000Z"));
  const gateway = new FakeGateway(clock);
  const repository = new FakeRepository();
  const logger = new FakeLogger();

  const execute = createDonationUseCase({
    gateway, repository, clock, logger,
    limits: { min: Money.fromReais(5), max: Money.fromReais(10000) },
    privacyTermsVersion: "2026-07-05",
  });

  return { clock, gateway, repository, logger, execute };
}

const pixInput = {
  valor: 50, nome: "Maria Silva", email: "maria@exemplo.com", cpf: "529.982.247-25",
  metodoPagamento: "pix" as const, aceitePrivacidade: true, cartao: null, endereco: null,
};

test("cria doacao pix de ponta a ponta", async () => {
  const { execute, repository, gateway } = setup();

  const { donation, payment } = await execute(pixInput);

  assert.equal(donation.status, "pendente");
  assert.equal(donation.amount.cents, 5000);
  assert.equal(donation.paymentId, "pay-1");
  assert.equal(payment.method, "pix");
  assert.equal(gateway.createCalls.length, 1);
  assert.equal((await repository.findById(donation.id))?.id, donation.id);
});

test("o id da doacao e alfanumerico de 36 caracteres, valido como MerchantOrderId", async () => {
  const { execute } = setup();
  const { donation } = await execute(pixInput);

  assert.equal(donation.id.length, 36);
  assert.match(donation.id, /^[A-Za-z0-9]+$/);
});

test("pix expira em 2 horas", async () => {
  const { execute, gateway } = setup();
  await execute(pixInput);

  assert.deepEqual(gateway.createCalls[0]?.expiresAt, new Date("2026-08-25T14:00:00.000Z"));
});

test("propaga ValidationError sem chamar o gateway", async () => {
  const { execute, gateway, repository } = setup();

  await assert.rejects(() => execute({ ...pixInput, valor: 1 }), ValidationError);

  assert.equal(gateway.createCalls.length, 0);
  assert.equal(repository.saved.length, 0);
});

test("rejeita CPF invalido como erro de validacao com campo", async () => {
  const { execute } = setup();

  await assert.rejects(
    () => execute({ ...pixInput, cpf: "111.111.111-11" }),
    (error: unknown) => error instanceof ValidationError && "cpf" in error.details,
  );
});

test("rejeita e-mail invalido como erro de validacao com campo", async () => {
  const { execute } = setup();

  await assert.rejects(
    () => execute({ ...pixInput, email: "maria" }),
    (error: unknown) => error instanceof ValidationError && "email" in error.details,
  );
});

test("salva a doacao como falhou quando o gateway quebra", async () => {
  const { execute, gateway, repository } = setup();
  gateway.failNextCreate(new Error("timeout"));

  await assert.rejects(() => execute(pixInput), GatewayError);

  assert.equal(repository.saved.length, 1);
  assert.equal(repository.saved[0]?.status, "falhou");
  assert.equal(repository.saved[0]?.paymentId, null);
});

test("cartao vira confirmada e nunca persiste o PAN", async () => {
  const { execute, repository } = setup();

  const { donation } = await execute({
    ...pixInput,
    metodoPagamento: "cartao",
    cartao: {
      numero: "4532117080573703", titular: "Maria Silva",
      validade: "12/2030", cvv: "123", bandeira: "Visa",
    },
  });

  assert.equal(donation.status, "confirmada");
  const serialized = JSON.stringify(repository.saved.map((item) => item.toSnapshot()));
  assert.ok(!serialized.includes("4532117080573703"));
  assert.ok(!serialized.includes("123"));
});

test("boleto exige endereco e o normaliza", async () => {
  const { execute, gateway } = setup();

  const { donation } = await execute({
    ...pixInput,
    metodoPagamento: "boleto",
    endereco: {
      logradouro: "Praça Sé", numero: "160", complemento: "",
      bairro: "Centro", cidade: "São Paulo", uf: "SP", cep: "01001-000",
    },
  });

  assert.equal(donation.donor.address?.street, "PRACA SE");
  assert.equal(gateway.createCalls[0]?.card, null);
});

test("nao loga CPF nem dados de cartao", async () => {
  const { execute, logger } = setup();
  await execute(pixInput);

  const serialized = JSON.stringify(logger.entries);
  assert.ok(!serialized.includes("52998224725"));
});
