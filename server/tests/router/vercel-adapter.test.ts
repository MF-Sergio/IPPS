import { test } from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../../src/router/router.ts";
import { withVercelApi } from "../../src/router/vercel-adapter.ts";
import { buildContainer } from "../../src/composition/container.ts";
import { fakeRequest, fakeResponse, readBody } from "./http-fixtures.ts";

const env = {
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
};

/**
 * Nenhum teste pode tocar a rede — mesmo stub usado em router.test.ts.
 */
const offlineFetch = (async () =>
  new Response(JSON.stringify({}), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  })) as unknown as typeof fetch;

/**
 * Este e o mesmo combinador `withVercelApi(handleRequest, container)` que
 * todas as Vercel Functions em api/*.ts usam. Antes da correcao do achado 1
 * da revisao, cada funcao chamava seu controller diretamente e ignorava
 * req.method — nada nesse pipeline barrava um metodo errado. Este teste
 * garante que o combinador que as functions realmente usam aplica metodo,
 * roteamento e headers de seguranca, para nao repetir a lacuna.
 */
function buildHandler() {
  const container = buildContainer(env, offlineFetch);
  return withVercelApi(handleRequest, container);
}

test("pipeline da Vercel rejeita metodo errado com 405", async () => {
  const handler = buildHandler();
  const { res, state } = fakeResponse();

  await handler(fakeRequest({ method: "DELETE", url: "/api/doacoes" }), res);

  assert.equal(state.status, 405);
});

test("pipeline da Vercel responde preflight OPTIONS com 204", async () => {
  const handler = buildHandler();
  const { res, state } = fakeResponse();

  await handler(fakeRequest({ method: "OPTIONS", url: "/api/doacoes" }), res);

  assert.equal(state.status, 204);
});

test("pipeline da Vercel aplica os headers de seguranca e roteia normalmente", async () => {
  const handler = buildHandler();
  const { res, state } = fakeResponse();

  await handler(fakeRequest({ method: "GET", url: "/api/health" }), res);

  assert.equal(state.status, 200);
  assert.equal(readBody(state)["ok"], true);
  assert.equal(state.headers["X-Content-Type-Options"], "nosniff");
  assert.equal(state.headers["X-Frame-Options"], "DENY");
  assert.ok(String(state.headers["Content-Security-Policy"] ?? "").includes("default-src 'self'"));
});
