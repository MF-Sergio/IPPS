import { test } from "node:test";
import assert from "node:assert/strict";
import { Email, InvalidEmailError } from "../../src/domain/shared/email.ts";

test("normaliza para minusculo e sem espaco", () => {
  assert.equal(Email.parse("  Maria@Exemplo.COM  ").value, "maria@exemplo.com");
});

test("rejeita formatos invalidos", () => {
  assert.throws(() => Email.parse("maria"), InvalidEmailError);
  assert.throws(() => Email.parse("maria@"), InvalidEmailError);
  assert.throws(() => Email.parse("maria@exemplo"), InvalidEmailError);
  assert.throws(() => Email.parse("maria @exemplo.com"), InvalidEmailError);
  assert.throws(() => Email.parse(""), InvalidEmailError);
});

test("rejeita acima de 254 caracteres", () => {
  assert.throws(() => Email.parse(`${"a".repeat(250)}@exemplo.com`), InvalidEmailError);
});
