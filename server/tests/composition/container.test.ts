import { test } from "node:test";
import assert from "node:assert/strict";
import { buildContainer } from "../../src/composition/container.ts";

const baseEnv = {
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
};

/**
 * `buildContainer` monta seu proprio `LoggerPort` internamente (console) e
 * nao aceita um substituto injetado, entao o unico jeito de observar o alerta
 * de boot e capturar o `console.warn` real, temporariamente.
 */
function captureConsoleWarn(run: () => void): string[] {
  const original = console.warn;
  const lines: string[] = [];
  console.warn = (line: unknown) => { lines.push(String(line)); };
  try {
    run();
  } finally {
    console.warn = original;
  }
  return lines;
}

test("acende alerta alto no boot quando o webhook nao tem header configurado em producao", () => {
  const lines = captureConsoleWarn(() => {
    buildContainer({ ...baseEnv, NODE_ENV: "production" });
  });

  assert.ok(
    lines.some((line) => line.includes("webhook") && line.includes("autenticacao")),
    "esperava um aviso de boot sobre o webhook sem autenticacao",
  );
});

test("nao alerta quando o par de header do webhook esta configurado", () => {
  const lines = captureConsoleWarn(() => {
    buildContainer({
      ...baseEnv,
      NODE_ENV: "production",
      CIELO_NOTIFICATION_HEADER_NAME: "X-IPPS-Token",
      CIELO_NOTIFICATION_HEADER_VALUE: "segredo-cadastrado-no-suporte",
    });
  });

  assert.equal(lines.length, 0);
});

test("nao alerta fora de producao mesmo sem o par de header configurado", () => {
  const lines = captureConsoleWarn(() => {
    buildContainer({ ...baseEnv });
  });

  assert.equal(lines.length, 0);
});
