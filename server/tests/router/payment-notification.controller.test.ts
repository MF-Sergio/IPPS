import { test } from "node:test";
import assert from "node:assert/strict";
import { createPaymentNotificationController } from "../../src/router/controllers/payment-notification.controller.ts";
import { handleError } from "../../src/router/error-handler.ts";
import { buildAppConfig } from "../../src/infrastructure/config/app.config.ts";
import { FakeLogger } from "../fakes/fake-logger.ts";
import { fakeRequest, fakeResponse, readBody } from "./http-fixtures.ts";

const baseEnv = {
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
};

test("extrai PaymentId e ChangeType e responde 200", async () => {
  const received: unknown[] = [];
  const controller = createPaymentNotificationController({
    config: buildAppConfig(baseEnv),
    handleNotification: async (input) => { received.push(input); },
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
  });

  const { res, state } = fakeResponse();
  await controller.handle(fakeRequest({ body: { PaymentId: "pay-1", ChangeType: 8 } }), res);

  assert.equal(state.status, 200);
});

test("bloqueia com 401 quando o header estatico nao confere", async () => {
  const controller = createPaymentNotificationController({
    config: buildAppConfig({
      ...baseEnv,
      CIELO_NOTIFICATION_HEADER_NAME: "X-IPPS-Token",
      CIELO_NOTIFICATION_HEADER_VALUE: "segredo",
    }),
    handleNotification: async () => { throw new Error("nao deveria ser chamado"); },
  });

  const { res, state } = fakeResponse();
  try {
    await controller.handle(fakeRequest({ body: { PaymentId: "pay-1", ChangeType: 1 } }), res);
  } catch (error) {
    handleError(res, error, new FakeLogger());
  }

  assert.equal(state.status, 401);
});
