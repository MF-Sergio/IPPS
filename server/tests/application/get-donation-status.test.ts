import { test } from "node:test";
import assert from "node:assert/strict";
import { createDonationUseCase } from "../../src/application/create-donation.usecase.ts";
import { getDonationStatusUseCase } from "../../src/application/get-donation-status.usecase.ts";
import { DonationNotFoundError } from "../../src/domain/donation/donation.errors.ts";
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

  const create = createDonationUseCase({
    gateway, repository, clock, logger,
    limits: { min: Money.fromReais(5), max: Money.fromReais(10000) },
    privacyTermsVersion: "2026-07-05",
  });
  const status = getDonationStatusUseCase({ gateway, repository, clock, logger });

  return { clock, gateway, repository, create, status };
}

const pixInput = {
  valor: 50, nome: "Maria Silva", email: "maria@exemplo.com", cpf: "52998224725",
  metodoPagamento: "pix" as const, aceitePrivacidade: true, cartao: null, endereco: null,
};

test("reconsulta a Cielo quando o status conhecido nao e terminal", async () => {
  const { create, status, gateway } = setup();
  const { donation } = await create(pixInput);

  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "confirmada", method: "pix", rawStatusCode: 2,
  });

  assert.equal((await status(donation.id)).status, "confirmada");
});

test("nao reconsulta quando o status ja e terminal", async () => {
  const { create, status, gateway, repository } = setup();
  const { donation } = await create(pixInput);

  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "negada", method: "pix", rawStatusCode: 3,
  });
  assert.equal((await status(donation.id)).status, "negada");

  // "negada" e terminal de verdade: mudar o snapshot nao pode mais mexer na
  // resposta, e nem deveria custar uma chamada de rede.
  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "confirmada", method: "pix", rawStatusCode: 2,
  });
  assert.equal((await status(donation.id)).status, "negada");
  assert.equal((await repository.findById(donation.id))?.status, "negada");
});

test("confirmada continua reconsultando, porque estorno acontece depois", async () => {
  const { create, status, gateway } = setup();
  const { donation } = await create(pixInput);

  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "confirmada", method: "pix", rawStatusCode: 2,
  });
  assert.equal((await status(donation.id)).status, "confirmada");

  // `confirmada` NAO e terminal: a maquina de estados permite
  // confirmada -> cancelada, que e exatamente o que um estorno faz. Se a
  // consulta congelasse aqui, o webhook diria "cancelada" e a consulta diria
  // "confirmada" para a mesma doacao — duas respostas conflitantes conforme o
  // caminho que rodou por ultimo.
  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "cancelada", method: "pix", rawStatusCode: 10,
  });
  assert.equal((await status(donation.id)).status, "cancelada");
});

test("marca pix como expirada apos 2 horas sem consultar a Cielo", async () => {
  const { create, status, clock, gateway } = setup();
  const { donation } = await create(pixInput);

  clock.advanceMinutes(121);
  const view = await status(donation.id);

  assert.equal(view.status, "expirada");
  // Prova de ausencia de chamada de rede: nenhuma das duas leituras da Cielo
  // foi acionada, nao apenas "nenhuma escrita aconteceu" (getPaymentById e
  // findPaymentByOrderId sao leituras e nunca mutam `snapshots`).
  assert.equal(gateway.getPaymentCalls.length, 0);
  assert.equal(gateway.findByOrderIdCalls.length, 0);
});

test("nao expira antes das 2 horas", async () => {
  const { create, status, clock } = setup();
  const { donation } = await create(pixInput);

  clock.advanceMinutes(119);
  assert.equal((await status(donation.id)).status, "pendente");
});

test("recupera pela Cielo quando o repositorio perdeu o registro", async () => {
  const { create, gateway } = setup();
  const { donation } = await create(pixInput);

  // Simula instancia serverless nova: repositorio zerado, Cielo intacta.
  const empty = new FakeRepository();
  const recovered = getDonationStatusUseCase({
    gateway, repository: empty, clock: new FakeClock(new Date("2026-08-25T12:05:00.000Z")),
    logger: { info() {}, warn() {}, error() {} },
  });

  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "confirmada", method: "pix", rawStatusCode: 2,
  });

  const view = await recovered(donation.id);
  assert.equal(view.id, donation.id);
  assert.equal(view.status, "confirmada");
});

test("lanca DonationNotFoundError quando nem a Cielo conhece o pedido", async () => {
  const { status } = setup();
  await assert.rejects(() => status("IPPSnaoexiste"), DonationNotFoundError);
});
