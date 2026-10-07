import { test } from "node:test";
import assert from "node:assert/strict";
import { createPaymentNotificationController } from "../../src/router/controllers/payment-notification.controller.ts";
import { handleError } from "../../src/router/error-handler.ts";
import { HttpError } from "../../src/router/http-context.ts";
import { buildAppConfig } from "../../src/infrastructure/config/app.config.ts";
import { FakeLogger } from "../fakes/fake-logger.ts";
import { fakeRequest, fakeResponse, readBody } from "./http-fixtures.ts";

const baseEnv = {
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
};

function noRateLimit(): void {}

test("extrai PaymentId e ChangeType e responde 200", async () => {
  const received: unknown[] = [];
  const controller = createPaymentNotificationController({
    config: buildAppConfig(baseEnv),
    handleNotification: async (input) => { received.push(input); },
    logger: new FakeLogger(),
    enforceRateLimit: noRateLimit,
  });

  const { res, state } = fakeResponse();
  await controller.handle(
    fakeRequest({ body: { PaymentId: "pay-1", ChangeType: 1, RecurrentPaymentId: null } }),
    res,
  );

  assert.equal(state.status, 200);
  assert.equal(readBody(state)["received"], true);
  assert.deepEqual(received, [{ paymentId: "pay-1", changeType: 1 }]);
});

test("responde 200 mesmo para ChangeType nao tratado", async () => {
  const controller = createPaymentNotificationController({
    config: buildAppConfig(baseEnv),
    handleNotification: async () => {},
    logger: new FakeLogger(),
    enforceRateLimit: noRateLimit,
  });

  const { res, state } = fakeResponse();
  await controller.handle(fakeRequest({ body: { PaymentId: "pay-1", ChangeType: 8 } }), res);

  assert.equal(state.status, 200);
});

test("PaymentId fora do formato e ignorado com 200, sem chamar o caso de uso", async () => {
  const logger = new FakeLogger();
  let called = false;
  const controller = createPaymentNotificationController({
    config: buildAppConfig(baseEnv),
    handleNotification: async () => { called = true; },
    logger,
    enforceRateLimit: noRateLimit,
  });

  const { res, state } = fakeResponse();
  await controller.handle(
    fakeRequest({ body: { PaymentId: "../../../evil", ChangeType: 1 } }),
    res,
  );

  assert.equal(state.status, 200);
  assert.equal(readBody(state)["received"], true);
  assert.equal(called, false);
  assert.ok(logger.entries.some((entry) => entry.level === "warn"));
});

test("PaymentId com query string injetada tambem e rejeitado com 200", async () => {
  let called = false;
  const controller = createPaymentNotificationController({
    config: buildAppConfig(baseEnv),
    handleNotification: async () => { called = true; },
    logger: new FakeLogger(),
    enforceRateLimit: noRateLimit,
  });

  const { res, state } = fakeResponse();
  await controller.handle(fakeRequest({ body: { PaymentId: "abc?x=1", ChangeType: 1 } }), res);

  assert.equal(state.status, 200);
  assert.equal(called, false);
});

test("PaymentId GUID valido de 36 caracteres passa normalmente", async () => {
  let called = false;
  const controller = createPaymentNotificationController({
    config: buildAppConfig(baseEnv),
    handleNotification: async () => { called = true; },
    logger: new FakeLogger(),
    enforceRateLimit: noRateLimit,
  });

  const { res, state } = fakeResponse();
  await controller.handle(
    fakeRequest({ body: { PaymentId: "11111111-2222-3333-4444-555555555555", ChangeType: 1 } }),
    res,
  );

  assert.equal(state.status, 200);
  assert.equal(called, true);
});

test("acima do limite de requisicoes: loga e responde 200, nao 429", async () => {
  const logger = new FakeLogger();
  let called = false;
  const controller = createPaymentNotificationController({
    config: buildAppConfig(baseEnv),
    handleNotification: async () => { called = true; },
    logger,
    enforceRateLimit: () => {
      throw new HttpError(429, "Muitas tentativas. Aguarde alguns minutos.", "RATE_LIMITED");
    },
  });

  const { res, state } = fakeResponse();
  await controller.handle(fakeRequest({ body: { PaymentId: "pay-1", ChangeType: 1 } }), res);

  assert.equal(state.status, 200);
  assert.equal(called, false);
  assert.ok(logger.entries.some((entry) => entry.level === "warn"));
});

test("bloqueia com 401 quando o header estatico nao confere", async () => {
  const controller = createPaymentNotificationController({
    config: buildAppConfig({
      ...baseEnv,
      CIELO_NOTIFICATION_HEADER_NAME: "X-IPPS-Token",
      CIELO_NOTIFICATION_HEADER_VALUE: "segredo",
    }),
    handleNotification: async () => { throw new Error("nao deveria ser chamado"); },
    logger: new FakeLogger(),
    enforceRateLimit: noRateLimit,
  });

  const { res, state } = fakeResponse();
  try {
    await controller.handle(fakeRequest({ body: { PaymentId: "pay-1", ChangeType: 1 } }), res);
  } catch (error) {
    handleError(res, error, new FakeLogger());
  }

  assert.equal(state.status, 401);
});
