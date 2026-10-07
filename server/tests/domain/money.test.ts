import { test } from "node:test";
import assert from "node:assert/strict";
import { InvalidMoneyError, Money } from "../../src/domain/shared/money.ts";

test("converte reais para centavos inteiros", () => {
  assert.equal(Money.fromReais(50).cents, 5000);
  assert.equal(Money.fromReais(12.34).cents, 1234);
});

test("arredonda o centavo em vez de truncar", () => {
  assert.equal(Money.fromReais(0.105).cents, 11);
  assert.equal(Money.fromReais(19.999).cents, 2000);
});

test("nao sofre erro de ponto flutuante", () => {
  assert.equal(Money.fromReais(1.1 + 2.2).cents, 330);
});

test("rejeita zero, negativo e nao-numero", () => {
  assert.throws(() => Money.fromReais(0), InvalidMoneyError);
  assert.throws(() => Money.fromReais(-5), InvalidMoneyError);
  assert.throws(() => Money.fromReais(Number.NaN), InvalidMoneyError);
  assert.throws(() => Money.fromReais(Number.POSITIVE_INFINITY), InvalidMoneyError);
});

test("rejeita centavos nao inteiros", () => {
  assert.throws(() => Money.fromCents(10.5), InvalidMoneyError);
});

test("volta para reais", () => {
  assert.equal(Money.fromCents(1234).reais, 12.34);
});

test("compara valores", () => {
  assert.ok(Money.fromReais(5).isLessThan(Money.fromReais(10)));
  assert.ok(Money.fromReais(10).isGreaterThan(Money.fromReais(5)));
  assert.ok(!Money.fromReais(5).isLessThan(Money.fromReais(5)));
});
