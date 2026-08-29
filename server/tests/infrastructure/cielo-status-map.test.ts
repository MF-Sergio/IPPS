import { test } from "node:test";
import assert from "node:assert/strict";
import { mapCieloStatus } from "../../src/infrastructure/cielo/cielo-status.map.ts";

test("status 1 depende do metodo — esta e a regra que impede mentir para o doador", () => {
  assert.equal(mapCieloStatus(1, "cartao"), "autorizada");
  assert.equal(mapCieloStatus(1, "boleto"), "pendente");
  assert.equal(mapCieloStatus(1, "pix"), "autorizada");
});

test("mapeia os demais codigos igual para todos os metodos", () => {
  for (const method of ["pix", "cartao", "boleto"] as const) {
    assert.equal(mapCieloStatus(0, method), "pendente");
    assert.equal(mapCieloStatus(12, method), "pendente");
    assert.equal(mapCieloStatus(2, method), "confirmada");
    assert.equal(mapCieloStatus(3, method), "negada");
    assert.equal(mapCieloStatus(10, method), "cancelada");
    assert.equal(mapCieloStatus(11, method), "cancelada");
    assert.equal(mapCieloStatus(13, method), "falhou");
    assert.equal(mapCieloStatus(20, method), "pendente");
  }
});

test("codigo desconhecido vira falhou em vez de estourar", () => {
  assert.equal(mapCieloStatus(99, "pix"), "falhou");
});
