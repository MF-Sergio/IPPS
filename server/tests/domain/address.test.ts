import { test } from "node:test";
import assert from "node:assert/strict";
import { Address, InvalidAddressError } from "../../src/domain/shared/address.ts";

const base = {
  logradouro: "Avenida Marechal Camara",
  numero: "160",
  complemento: "Sala 934",
  bairro: "Centro",
  cidade: "Rio de Janeiro",
  uf: "rj",
  cep: "22750-012",
};

test("normaliza para maiusculas sem acento", () => {
  const address = Address.parse({ ...base, logradouro: "Praça Sé", bairro: "Jardim Ipê" });
  assert.equal(address.street, "PRACA SE");
  assert.equal(address.district, "JARDIM IPE");
});

test("mantem hifen e apostrofo, que a Cielo aceita", () => {
  const address = Address.parse({ ...base, logradouro: "Rua D'El-Rei" });
  assert.equal(address.street, "RUA D'EL-REI");
});

test("normaliza UF e CEP", () => {
  const address = Address.parse(base);
  assert.equal(address.state, "RJ");
  assert.equal(address.zipCode, "22750012");
  assert.equal(address.country, "BRA");
});

test("aceita campos validos mesmo quando a soma passa de 60 caracteres", () => {
  assert.doesNotThrow(() => Address.parse({
    ...base,
    logradouro: "A".repeat(55),
    bairro: "B".repeat(10),
  }));
});

test("rejeita campos que excedem seus limites individuais", () => {
  assert.throws(() => Address.parse({ ...base, logradouro: "A".repeat(61) }), InvalidAddressError);
  assert.throws(() => Address.parse({ ...base, numero: "1".repeat(11) }), InvalidAddressError);
  assert.throws(() => Address.parse({ ...base, complemento: "A".repeat(31) }), InvalidAddressError);
  assert.throws(() => Address.parse({ ...base, bairro: "B".repeat(31) }), InvalidAddressError);
});

test("rejeita UF invalida e CEP invalido", () => {
  assert.throws(() => Address.parse({ ...base, uf: "XX" }), InvalidAddressError);
  assert.throws(() => Address.parse({ ...base, cep: "123" }), InvalidAddressError);
});

test("rejeita campos obrigatorios vazios", () => {
  assert.throws(() => Address.parse({ ...base, logradouro: "" }), InvalidAddressError);
  assert.throws(() => Address.parse({ ...base, cidade: "  " }), InvalidAddressError);
});

test("complemento e opcional", () => {
  const address = Address.parse({ ...base, complemento: "" });
  assert.equal(address.complement, "");
});
