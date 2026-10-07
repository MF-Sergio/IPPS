import { test } from "node:test";
import assert from "node:assert/strict";
import { CardCredentials, InvalidCardError } from "../../src/domain/shared/card-credentials.ts";

// Atencao: a documentacao da Cielo usa "4532117080573700" nos exemplos, mas esse
// numero NAO passa no Luhn (soma 57) — e um placeholder de doc, nao um cartao de
// teste. Usamos o mesmo numero com o digito verificador correto (soma 60).
// Nao "corrija" de volta para o da doc: os testes de Luhn passariam a mentir.
const valid = {
  numero: "4532 1170 8057 3703",
  titular: "Maria Silva",
  validade: "12/2030",
  cvv: "123",
  bandeira: "visa",
};

test("normaliza os campos publicos", () => {
  const card = CardCredentials.parse(valid);
  assert.equal(card.holder, "MARIA SILVA");
  assert.equal(card.expirationDate, "12/2030");
  assert.equal(card.brand, "Visa");
  assert.equal(card.lastDigits, "3703");
});

test("aceita validade MM/AA e normaliza para MM/AAAA", () => {
  assert.equal(CardCredentials.parse({ ...valid, validade: "12/30" }).expirationDate, "12/2030");
});

test("reveal e o unico caminho para o PAN e o CVV", () => {
  const revealed = CardCredentials.parse(valid).reveal();
  assert.equal(revealed.number, "4532117080573703");
  assert.equal(revealed.cvv, "123");
});

test("JSON.stringify nunca expoe o PAN nem o CVV", () => {
  const card = CardCredentials.parse(valid);
  const serialized = JSON.stringify({ pagamento: { card } });

  assert.ok(!serialized.includes("4532117080573703"));
  assert.ok(!serialized.includes("123"));
  assert.ok(serialized.includes("3703"));
});

test("toString nao expoe o PAN", () => {
  const card = CardCredentials.parse(valid);
  assert.ok(!`${card}`.includes("4532117080573703"));
});

test("rejeita cartao invalido por Luhn", () => {
  assert.throws(() => CardCredentials.parse({ ...valid, numero: "4532117080573701" }), InvalidCardError);
});

test("rejeita CVV, validade e bandeira invalidos", () => {
  assert.throws(() => CardCredentials.parse({ ...valid, cvv: "1" }), InvalidCardError);
  assert.throws(() => CardCredentials.parse({ ...valid, validade: "13/2030" }), InvalidCardError);
  assert.throws(() => CardCredentials.parse({ ...valid, validade: "12/2020" }), InvalidCardError);
  assert.throws(() => CardCredentials.parse({ ...valid, bandeira: "Bandeirinha" }), InvalidCardError);
});
