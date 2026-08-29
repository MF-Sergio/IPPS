import { test } from "node:test";
import assert from "node:assert/strict";
import { buildAppConfig, MissingEnvError } from "../../src/infrastructure/config/app.config.ts";

const minimal = {
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
};

test("aplica os defaults documentados", () => {
  const config = buildAppConfig(minimal);

  assert.equal(config.cielo.environment, "sandbox");
  assert.equal(config.cielo.transactionBaseUrl, "https://apisandbox.cieloecommerce.cielo.com.br");
  assert.equal(config.cielo.queryBaseUrl, "https://apiquerysandbox.cieloecommerce.cielo.com.br");
  assert.equal(config.donationLimits.min.reais, 5);
  assert.equal(config.donationLimits.max.reais, 10000);
  assert.equal(config.port, 3001);
});

test("troca as URLs em producao", () => {
  const config = buildAppConfig({ ...minimal, CIELO_ENVIRONMENT: "production" });

  assert.equal(config.cielo.transactionBaseUrl, "https://api.cieloecommerce.cielo.com.br");
  assert.equal(config.cielo.queryBaseUrl, "https://apiquery.cieloecommerce.cielo.com.br");
});

test("falha rapido sem credenciais da Cielo", () => {
  assert.throws(() => buildAppConfig({}), MissingEnvError);
  assert.throws(() => buildAppConfig({ CIELO_MERCHANT_ID: "x" }), MissingEnvError);
});

test("rejeita faixa de doacao invertida", () => {
  assert.throws(
    () => buildAppConfig({ ...minimal, DONATION_MIN_VALUE: "100", DONATION_MAX_VALUE: "50" }),
    MissingEnvError,
  );
});

test("le as origens permitidas", () => {
  const config = buildAppConfig({
    ...minimal,
    ALLOWED_ORIGINS: "https://ipps.com.br, https://www.ipps.com.br",
  });

  assert.ok(config.allowedOrigins.has("https://ipps.com.br"));
  assert.ok(config.allowedOrigins.has("https://www.ipps.com.br"));
});

test("nao inclui origens de dev quando NODE_ENV e production", () => {
  const config = buildAppConfig({ ...minimal, NODE_ENV: "production" });

  assert.ok(!config.allowedOrigins.has("http://localhost:5173"));
  assert.ok(!config.allowedOrigins.has("http://127.0.0.1:5173"));
});

test("inclui origens de dev fora de production", () => {
  const config = buildAppConfig(minimal);

  assert.ok(config.allowedOrigins.has("http://localhost:5173"));
  assert.ok(config.allowedOrigins.has("http://127.0.0.1:5173"));
});
