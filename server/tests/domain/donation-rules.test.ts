import { test } from "node:test";
import assert from "node:assert/strict";
import { assertDonationIsValid } from "../../src/domain/donation/donation.rules.ts";
import { ValidationError } from "../../src/domain/donation/donation.errors.ts";
import { Money } from "../../src/domain/shared/money.ts";
import { Address } from "../../src/domain/shared/address.ts";
import { CardCredentials } from "../../src/domain/shared/card-credentials.ts";

const limits = { min: Money.fromReais(5), max: Money.fromReais(10000) };

const address = Address.parse({
  logradouro: "Av Camara", numero: "160", complemento: "",
  bairro: "Centro", cidade: "Rio de Janeiro", uf: "RJ", cep: "22750012",
});

const card = CardCredentials.parse({
  numero: "4532117080573703", titular: "Maria Silva",
  validade: "12/2030", cvv: "123", bandeira: "Visa",
});

const validPix = {
  amount: Money.fromReais(50), method: "pix" as const,
  privacyAccepted: true, card: null, address: null, limits,
};

test("aceita doacao pix valida", () => {
  assert.doesNotThrow(() => assertDonationIsValid(validPix));
});

test("rejeita valor fora da faixa", () => {
  assert.throws(
    () => assertDonationIsValid({ ...validPix, amount: Money.fromReais(4) }),
    (error: unknown) => error instanceof ValidationError && "valor" in error.details,
  );
  assert.throws(
    () => assertDonationIsValid({ ...validPix, amount: Money.fromReais(10001) }),
    (error: unknown) => error instanceof ValidationError && "valor" in error.details,
  );
});

test("aceita exatamente o minimo e o maximo", () => {
  assert.doesNotThrow(() => assertDonationIsValid({ ...validPix, amount: Money.fromReais(5) }));
  assert.doesNotThrow(() => assertDonationIsValid({ ...validPix, amount: Money.fromReais(10000) }));
});

test("exige aceite da politica de privacidade", () => {
  assert.throws(
    () => assertDonationIsValid({ ...validPix, privacyAccepted: false }),
    (error: unknown) => error instanceof ValidationError && "aceitePrivacidade" in error.details,
  );
});

test("cartao exige dados de cartao", () => {
  assert.throws(
    () => assertDonationIsValid({ ...validPix, method: "cartao", card: null }),
    (error: unknown) => error instanceof ValidationError && "cartao" in error.details,
  );
  assert.doesNotThrow(() => assertDonationIsValid({ ...validPix, method: "cartao", card }));
});

test("boleto exige endereco", () => {
  assert.throws(
    () => assertDonationIsValid({ ...validPix, method: "boleto", address: null }),
    (error: unknown) => error instanceof ValidationError && "endereco" in error.details,
  );
  assert.doesNotThrow(() => assertDonationIsValid({ ...validPix, method: "boleto", address }));
});

test("pix nao exige cartao nem endereco", () => {
  assert.doesNotThrow(() => assertDonationIsValid(validPix));
});

test("acumula todas as violacoes num unico erro", () => {
  assert.throws(
    () => assertDonationIsValid({
      ...validPix, amount: Money.fromReais(1), privacyAccepted: false, method: "boleto", address: null,
    }),
    (error: unknown) => {
      assert.ok(error instanceof ValidationError);
      assert.deepEqual(
        Object.keys(error.details).sort(),
        ["aceitePrivacidade", "endereco", "valor"],
      );
      return true;
    },
  );
});
