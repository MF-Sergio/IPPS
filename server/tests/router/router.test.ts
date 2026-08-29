import { test } from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../../src/router/router.ts";
import { buildContainer } from "../../src/composition/container.ts";
import { fakeRequest, fakeResponse, readBody } from "./http-fixtures.ts";

const env = {
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
};

/**
 * Nenhum teste pode tocar a rede. Este stub responde 404 a tudo, que e o
 * suficiente para exercitar o roteamento sem sandbox da Cielo.
 */
const offlineFetch = (async () =>
  new Response(JSON.stringify({}), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  })) as unknown as typeof fetch;

function url(pathname: string): URL {
  return new URL(pathname, "http://localhost:3001");
}

test("GET /api/health responde ok", async () => {
  const container = buildContainer(env, offlineFetch);
  const { res, state } = fakeResponse();

  await handleRequest(fakeRequest({ method: "GET" }), res, url("/api/health"), container);

  assert.equal(state.status, 200);
  assert.equal(readBody(state)["ok"], true);
});

test("rota de API inexistente vira 404 com codigo proprio", async () => {
  const container = buildContainer(env, offlineFetch);
  const { res, state } = fakeResponse();

  await handleRequest(fakeRequest({ method: "GET" }), res, url("/api/nada"), container);

  assert.equal(state.status, 404);
  assert.equal(readBody(state)["code"], "API_NOT_FOUND");
});

test("metodo errado na rota certa vira 405", async () => {
  const container = buildContainer(env, offlineFetch);
  const { res, state } = fakeResponse();

  await handleRequest(fakeRequest({ method: "GET" }), res, url("/api/doacoes"), container);

  assert.equal(state.status, 405);
});

test("extrai o id da rota de status", async () => {
  const container = buildContainer(env, offlineFetch);
  const { res, state } = fakeResponse();

  await handleRequest(
    fakeRequest({ method: "GET" }),
    res,
    url("/api/doacoes/IPPSinexistente/status"),
    container,
  );

  // Sem doacao e sem Cielo real, o resultado esperado e 404 de doacao,
  // nao 404 de rota — provando que a rota casou e o id foi extraido.
  assert.equal(state.status, 404);
  assert.equal(readBody(state)["code"], "DONATION_NOT_FOUND");
});

test("id fora do formato alfanumerico vira 400", async () => {
  const container = buildContainer(env, offlineFetch);
  const { res, state } = fakeResponse();

  await handleRequest(
    fakeRequest({ method: "GET" }),
    res,
    url("/api/doacoes/nao--valido/status"),
    container,
  );

  assert.equal(state.status, 400);
  assert.equal(readBody(state)["code"], "INVALID_DONATION_ID");
});

test("container falha rapido sem credenciais da Cielo", () => {
  assert.throws(() => buildContainer({}), /CIELO_MERCHANT_ID/);
});
