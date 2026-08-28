import { test } from "node:test";
import assert from "node:assert/strict";
import { Cpf, InvalidCpfError } from "../../src/domain/shared/cpf.ts";

test("aceita CPF valido e normaliza para 11 digitos", () => {
  assert.equal(Cpf.parse("529.982.247-25").digits, "52998224725");
  assert.equal(Cpf.parse("52998224725").digits, "52998224725");
});

test("rejeita digito verificador errado", () => {
  assert.throws(() => Cpf.parse("529.982.247-26"), InvalidCpfError);
});

test("rejeita sequencias repetidas", () => {
  assert.throws(() => Cpf.parse("111.111.111-11"), InvalidCpfError);
  assert.throws(() => Cpf.parse("00000000000"), InvalidCpfError);
});

test("rejeita tamanho invalido", () => {
  assert.throws(() => Cpf.parse("123"), InvalidCpfError);
  assert.throws(() => Cpf.parse(""), InvalidCpfError);
});

test("expoe o tipo de documento exigido pela Cielo", () => {
  assert.equal(Cpf.parse("52998224725").identityType, "CPF");
});
