import { test } from "node:test";
import assert from "node:assert/strict";
import { createCieloClient } from "../../src/infrastructure/cielo/cielo.client.ts";
import { CieloHttpError } from "../../src/infrastructure/cielo/cielo.errors.ts";
import { buildAppConfig } from "../../src/infrastructure/config/app.config.ts";
import { FakeLogger } from "../fakes/fake-logger.ts";

const config = buildAppConfig({
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
}).cielo;

/**
 * Simula uma resposta HTTP cujo corpo falha ao ser lido (conexao caiu no meio
 * do stream) — algo que `new Response(...)` normal nao reproduz facilmente.
 */
function responseWithBrokenBody(status: number): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: () => Promise.reject(new Error("conexao caiu lendo o corpo")),
  } as unknown as Response;
}

test("falha ao ler o corpo da resposta vira CieloHttpError, nao TypeError cru", async () => {
  const logger = new FakeLogger();
  const fetchImpl = (async () => responseWithBrokenBody(200)) as unknown as typeof fetch;
  const client = createCieloClient(config, fetchImpl, logger);

  await assert.rejects(
    () => client.get(config.queryBaseUrl, "/1/sales/p1"),
    (error: unknown) => error instanceof CieloHttpError,
  );
});

test("timeout ainda protege a leitura do corpo, nao so a chamada de rede", async () => {
  // clearTimeout so pode rodar depois que o corpo terminar de ser lido -
  // senao uma leitura de corpo pendurada fica sem limite de tempo nenhum.
  let cleared = false;
  const originalClearTimeout = globalThis.clearTimeout;
  (globalThis as unknown as { clearTimeout: typeof clearTimeout }).clearTimeout = ((
    ...args: Parameters<typeof clearTimeout>
  ) => {
    cleared = true;
    return originalClearTimeout(...args);
  }) as typeof clearTimeout;

  try {
    const logger = new FakeLogger();
    let clearedDuringTextRead = false;
    const fetchImpl = (async () => ({
      ok: true,
      status: 200,
      text: async () => {
        clearedDuringTextRead = cleared;
        return JSON.stringify({ Payment: { PaymentId: "p1", Status: 2, Type: "Pix" } });
      },
    })) as unknown as typeof fetch;

    const client = createCieloClient(config, fetchImpl, logger);
    await client.get(config.queryBaseUrl, "/1/sales/p1");

    assert.equal(clearedDuringTextRead, false, "clearTimeout nao deveria rodar antes de ler o corpo");
  } finally {
    globalThis.clearTimeout = originalClearTimeout;
  }
});
