import { test } from "node:test";
import assert from "node:assert/strict";
import {
  assertTransition,
  canTransition,
  isPaymentMethod,
  isTerminal,
} from "../../src/domain/donation/donation-status.ts";
import { InvalidStatusTransitionError } from "../../src/domain/donation/donation.errors.ts";

test("transicoes validas a partir de pendente", () => {
  for (const to of ["autorizada", "confirmada", "negada", "falhou", "expirada"] as const) {
    assert.ok(canTransition("pendente", to), `pendente -> ${to} deveria ser valido`);
  }
});

test("transicoes validas a partir de autorizada", () => {
  assert.ok(canTransition("autorizada", "confirmada"));
  assert.ok(canTransition("autorizada", "cancelada"));
  assert.ok(canTransition("autorizada", "falhou"));
  assert.ok(!canTransition("autorizada", "pendente"));
});

test("confirmada so pode ser cancelada", () => {
  assert.ok(canTransition("confirmada", "cancelada"));
  assert.ok(!canTransition("confirmada", "negada"));
  assert.ok(!canTransition("confirmada", "pendente"));
});

test("status terminais nao transicionam", () => {
  for (const status of ["negada", "falhou", "expirada", "cancelada"] as const) {
    assert.ok(isTerminal(status));
    assert.ok(!canTransition(status, "confirmada"));
  }
});

test("pendente, autorizada e confirmada nao sao terminais", () => {
  assert.ok(!isTerminal("pendente"));
  assert.ok(!isTerminal("autorizada"));
  assert.ok(!isTerminal("confirmada"));
});

test("permanecer no mesmo status e sempre valido", () => {
  assert.ok(canTransition("confirmada", "confirmada"));
  assert.ok(canTransition("negada", "negada"));
});

test("assertTransition lanca em transicao invalida", () => {
  assert.throws(() => assertTransition("confirmada", "pendente"), InvalidStatusTransitionError);
});

test("reconhece metodos de pagamento", () => {
  assert.ok(isPaymentMethod("pix"));
  assert.ok(isPaymentMethod("cartao"));
  assert.ok(isPaymentMethod("boleto"));
  assert.ok(!isPaymentMethod("cripto"));
  assert.ok(!isPaymentMethod(undefined));
});
