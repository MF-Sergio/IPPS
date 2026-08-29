import { test } from "node:test";
import assert from "node:assert/strict";
import { createDonationsController } from "../../src/router/controllers/donations.controller.ts";
import { HttpError, handleError } from "../../src/router/error-handler.ts";
import { createDonationUseCase } from "../../src/application/create-donation.usecase.ts";
import { getDonationStatusUseCase } from "../../src/application/get-donation-status.usecase.ts";
import { buildAppConfig } from "../../src/infrastructure/config/app.config.ts";
import { FakeClock } from "../fakes/fake-clock.ts";
import { FakeGateway } from "../fakes/fake-gateway.ts";
import { FakeLogger } from "../fakes/fake-logger.ts";
import { FakeRepository } from "../fakes/fake-repository.ts";
import { fakeRequest, fakeResponse, readBody } from "./http-fixtures.ts";

const config = buildAppConfig({
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
});

function setup() {
  const clock = new FakeClock(new Date("2026-08-25T12:00:00.000Z"));
  const gateway = new FakeGateway(clock);
  const repository = new FakeRepository();
  const logger = new FakeLogger();

  const controller = createDonationsController({
    config,
    createDonation: createDonationUseCase({
      gateway, repository, clock, logger,
      limits: config.donationLimits,
      privacyTermsVersion: config.privacyTermsVersion,
    }),
    getDonationStatus: getDonationStatusUseCase({ gateway, repository, clock, logger }),
    enforceRateLimit: () => {},
  });

  return { controller, gateway, repository, clock, logger };
}

const pixBody = {
  valor: 50, nome: "Maria Silva", email: "maria@exemplo.com", cpf: "52998224725",
  metodoPagamento: "pix", aceitePrivacidade: true,
};

test("POST devolve 201 com o bloco de pix e sem cache", async () => {
  const { controller } = setup();
  const { res, state } = fakeResponse();

  await controller.create(fakeRequest({ body: pixBody }), res);

  assert.equal(state.status, 201);
  assert.equal(state.headers["Cache-Control"], "no-store");

  const body = readBody(state);
  assert.equal(body["status"], "pendente");
  assert.equal(body["valor"], 50);
  assert.ok("pix" in body);
  assert.ok(!("preferenceId" in body));
  assert.ok(!("checkoutUrl" in body));
});

test("rejeita origem nao permitida com 403 antes de tocar no caso de uso", async () => {
  const { controller, gateway } = setup();
  const { res, state } = fakeResponse();

  try {
    await controller.create(
      fakeRequest({ body: pixBody, headers: { origin: "https://malicioso.com" } }),
      res,
    );
  } catch (error) {
    handleError(res, error, new FakeLogger());
  }

  assert.equal(state.status, 403);
  assert.equal(gateway.createCalls.length, 0);
});

test("aplica rate limit antes de criar a doacao", async () => {
  const { gateway, repository, clock, logger } = setup();
  const { res, state } = fakeResponse();

  // Reusa os fakes de setup(), mas com um limitador proprio, para provar
  // ordem — nao so invocacao. Se o rate limit corresse depois do caso de
  // uso, gateway.createCalls teria 1 chamada mesmo com o limitador estourando.
  const controller = createDonationsController({
    config,
    createDonation: createDonationUseCase({
      gateway, repository, clock, logger,
      limits: config.donationLimits, privacyTermsVersion: config.privacyTermsVersion,
    }),
    getDonationStatus: getDonationStatusUseCase({ gateway, repository, clock, logger }),
    enforceRateLimit: () => {
      throw new HttpError(429, "Muitas tentativas. Aguarde alguns minutos.", "RATE_LIMITED");
    },
  });

  try {
    await controller.create(fakeRequest({ body: pixBody }), res);
  } catch (error) {
    handleError(res, error, new FakeLogger());
  }

  assert.equal(state.status, 429);
  assert.equal(gateway.createCalls.length, 0);
});

test("GET status devolve o status atual", async () => {
  const { controller, gateway } = setup();

  const created = fakeResponse();
  await controller.create(fakeRequest({ body: pixBody }), created.res);
  const id = String(readBody(created.state)["id"]);

  gateway.setSnapshot({
    paymentId: "pay-1", orderId: id, status: "confirmada", method: "pix", rawStatusCode: 2,
  });

  const { res, state } = fakeResponse();
  await controller.status(fakeRequest({ method: "GET" }), res, id);

  assert.equal(state.status, 200);
  assert.equal(readBody(state)["status"], "confirmada");
});

test("erro de validacao chega como 400 com details", async () => {
  const { controller } = setup();
  const { res, state } = fakeResponse();

  try {
    await controller.create(fakeRequest({ body: { ...pixBody, valor: 1 } }), res);
  } catch (error) {
    handleError(res, error, new FakeLogger());
  }

  assert.equal(state.status, 400);
  const body = readBody(state);
  assert.equal(body["code"], "VALIDATION_ERROR");
  assert.ok("valor" in (body["details"] as Record<string, string>));
});
