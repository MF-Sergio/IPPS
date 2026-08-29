import { test } from "node:test";
import assert from "node:assert/strict";
import { handleError, HttpError } from "../../src/router/error-handler.ts";
import { DonationNotFoundError, ValidationError } from "../../src/domain/donation/donation.errors.ts";
import { GatewayError, PaymentDeniedError } from "../../src/application/application.errors.ts";
import { CieloHttpError } from "../../src/infrastructure/cielo/cielo.errors.ts";
import { FakeLogger } from "../fakes/fake-logger.ts";

function fakeResponse() {
  const state = { status: 0, headers: {} as Record<string, string>, body: "" };
  const res = {
    writeHead(status: number, headers: Record<string, string>) {
      state.status = status;
      Object.assign(state.headers, headers);
    },
    end(body: string) {
      state.body = body;
    },
  };
  return { res: res as never, state };
}

test("ValidationError vira 400 com details por campo", () => {
  const { res, state } = fakeResponse();
  handleError(res, new ValidationError("Revise os dados.", { valor: "muito baixo" }), new FakeLogger());

  assert.equal(state.status, 400);
  const body = JSON.parse(state.body);
  assert.equal(body.code, "VALIDATION_ERROR");
  assert.deepEqual(body.details, { valor: "muito baixo" });
});

test("DonationNotFoundError vira 404", () => {
  const { res, state } = fakeResponse();
  handleError(res, new DonationNotFoundError("IPPS1"), new FakeLogger());
  assert.equal(state.status, 404);
});

test("GatewayError vira 502 e PaymentDeniedError vira 402", () => {
  const gateway = fakeResponse();
  handleError(gateway.res, new GatewayError(), new FakeLogger());
  assert.equal(gateway.state.status, 502);

  const denied = fakeResponse();
  handleError(denied.res, new PaymentDeniedError(), new FakeLogger());
  assert.equal(denied.state.status, 402);
});

test("erro desconhecido vira 500 sem vazar a mensagem interna", () => {
  const { res, state } = fakeResponse();
  handleError(res, new Error("conexao com o banco caiu em /var/secret"), new FakeLogger());

  assert.equal(state.status, 500);
  const body = JSON.parse(state.body);
  assert.equal(body.code, "INTERNAL_ERROR");
  assert.ok(!body.message.includes("/var/secret"));
});

test("mensagem crua da Cielo nunca chega ao cliente", () => {
  const { res, state } = fakeResponse();
  handleError(res, new CieloHttpError(400, "Credit Card Number is invalid", "126"), new FakeLogger());

  const body = JSON.parse(state.body);
  assert.ok(!body.message.includes("Credit Card Number is invalid"));
  assert.equal(body.code, "PAYMENT_GATEWAY_ERROR");
});

test("erros 5xx sao registrados em log, 4xx nao", () => {
  const serverLogger = new FakeLogger();
  handleError(fakeResponse().res, new Error("boom"), serverLogger);
  assert.equal(serverLogger.entries.filter((entry) => entry.level === "error").length, 1);

  const clientLogger = new FakeLogger();
  handleError(fakeResponse().res, new ValidationError("x", {}), clientLogger);
  assert.equal(clientLogger.entries.filter((entry) => entry.level === "error").length, 0);
});

test("respostas de erro nunca sao cacheadas", () => {
  const { res, state } = fakeResponse();
  handleError(res, new HttpError(403, "Origem nao autorizada.", "ORIGIN_NOT_ALLOWED"), new FakeLogger());
  assert.equal(state.headers["Cache-Control"], "no-store");
});
