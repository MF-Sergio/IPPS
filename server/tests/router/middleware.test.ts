import { test } from "node:test";
import assert from "node:assert/strict";
import { applyCors, isTrustedBrowserRequest } from "../../src/router/middleware/cors.ts";
import { createRateLimiter } from "../../src/router/middleware/rate-limit.ts";
import { setBaseSecurityHeaders } from "../../src/router/middleware/security-headers.ts";
import { assertWebhookAuthentic } from "../../src/router/middleware/webhook-auth.ts";
import { HttpError } from "../../src/router/http-context.ts";
import { buildAppConfig } from "../../src/infrastructure/config/app.config.ts";

const config = buildAppConfig({
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
  ALLOWED_ORIGINS: "https://ipps.com.br",
  RATE_LIMIT_MAX: "2",
});

function fakeRes() {
  const headers: Record<string, string> = {};
  return {
    res: { setHeader: (key: string, value: string) => { headers[key] = value; } } as never,
    headers,
  };
}

function fakeReq(headers: Record<string, string>) {
  return { headers, socket: { remoteAddress: "1.2.3.4" } } as never;
}

test("CORS so responde para origem permitida", () => {
  const allowed = fakeRes();
  applyCors(fakeReq({ origin: "https://ipps.com.br" }), allowed.res, config);
  assert.equal(allowed.headers["Access-Control-Allow-Origin"], "https://ipps.com.br");

  const blocked = fakeRes();
  applyCors(fakeReq({ origin: "https://malicioso.com" }), blocked.res, config);
  assert.equal(blocked.headers["Access-Control-Allow-Origin"], undefined);
});

test("requisicao de origem nao permitida nao e confiavel", () => {
  assert.ok(isTrustedBrowserRequest(fakeReq({ origin: "https://ipps.com.br" }), config));
  assert.ok(!isTrustedBrowserRequest(fakeReq({ origin: "https://malicioso.com" }), config));
});

test("CSP nao menciona mais o Mercado Pago", () => {
  const { res, headers } = fakeRes();
  setBaseSecurityHeaders(res, config);

  const csp = headers["Content-Security-Policy"] ?? "";
  assert.ok(!csp.includes("mercadopago"));
  assert.ok(csp.includes("frame-ancestors 'none'"));
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
});

test("rate limit bloqueia acima do teto configurado", () => {
  const limiter = createRateLimiter(config);
  const req = fakeReq({ "x-forwarded-for": "9.9.9.9" });

  limiter(req);
  limiter(req);
  assert.throws(() => limiter(req), HttpError);
});

test("rate limit isola por IP", () => {
  const limiter = createRateLimiter(config);
  limiter(fakeReq({ "x-forwarded-for": "1.1.1.1" }));
  limiter(fakeReq({ "x-forwarded-for": "1.1.1.1" }));
  assert.doesNotThrow(() => limiter(fakeReq({ "x-forwarded-for": "2.2.2.2" })));
});

test("webhook exige o header estatico quando ele esta configurado", () => {
  const secured = buildAppConfig({
    CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
    CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
    CIELO_NOTIFICATION_HEADER_NAME: "X-IPPS-Token",
    CIELO_NOTIFICATION_HEADER_VALUE: "segredo-cadastrado-no-suporte",
  });

  assert.doesNotThrow(() =>
    assertWebhookAuthentic(fakeReq({ "x-ipps-token": "segredo-cadastrado-no-suporte" }), secured),
  );
  assert.throws(() => assertWebhookAuthentic(fakeReq({}), secured), HttpError);
  assert.throws(
    () => assertWebhookAuthentic(fakeReq({ "x-ipps-token": "errado" }), secured),
    HttpError,
  );
});

test("sem header configurado o webhook passa, porque a Cielo nao assina", () => {
  assert.doesNotThrow(() => assertWebhookAuthentic(fakeReq({}), config));
});
