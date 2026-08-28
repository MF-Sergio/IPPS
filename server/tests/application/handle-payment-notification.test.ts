import { test } from "node:test";
import assert from "node:assert/strict";
import { createDonationUseCase } from "../../src/application/create-donation.usecase.ts";
import { handlePaymentNotificationUseCase } from "../../src/application/handle-payment-notification.usecase.ts";
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
  const notify = handlePaymentNotificationUseCase({ gateway, repository, clock, logger });

  return { clock, gateway, repository, logger, create, notify };
}

const pixInput = {
  valor: 50, nome: "Maria Silva", email: "maria@exemplo.com", cpf: "52998224725",
  metodoPagamento: "pix" as const, aceitePrivacidade: true, cartao: null, endereco: null,
};

test("atualiza a doacao com o status consultado na Cielo", async () => {
  const { create, notify, gateway, repository } = setup();
  const { donation } = await create(pixInput);

  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "confirmada", method: "pix", rawStatusCode: 2,
  });

  await notify({ paymentId: "pay-1", changeType: 1 });

  assert.equal((await repository.findById(donation.id))?.status, "confirmada");
});

test("ignora ChangeType que nao seja 1, mas registra em log", async () => {
  const { create, notify, repository, logger } = setup();
  const { donation } = await create(pixInput);

  await notify({ paymentId: "pay-1", changeType: 7 });

  assert.equal((await repository.findById(donation.id))?.status, "pendente");
  assert.ok(logger.entries.some((entry) => entry.message.includes("ignorada")));
});

test("nao lanca quando a Cielo nao conhece o pagamento", async () => {
  const { notify, logger } = setup();

  await assert.doesNotReject(() => notify({ paymentId: "inexistente", changeType: 1 }));
  assert.ok(logger.entries.some((entry) => entry.level === "error"));
});

test("nao lanca quando a transicao seria invalida", async () => {
  const { create, notify, gateway, repository } = setup();
  const { donation } = await create(pixInput);

  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "confirmada", method: "pix", rawStatusCode: 2,
  });
  await notify({ paymentId: "pay-1", changeType: 1 });

  gateway.setSnapshot({
    paymentId: "pay-1", orderId: donation.id,
    status: "negada", method: "pix", rawStatusCode: 3,
  });
  await assert.doesNotReject(() => notify({ paymentId: "pay-1", changeType: 1 }));

  assert.equal((await repository.findById(donation.id))?.status, "confirmada");
});
