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

test("rejeita quando logradouro, numero, complemento e bairro passam de 60 caracteres", () => {
  assert.throws(
    () => Address.parse({ ...base, logradouro: "A".repeat(55) }),
    InvalidAddressError,
  );
});

test("aceita exatamente 60 caracteres somados", () => {
  // 44 + 3 + 8 + 5 = 60
  const address = Address.parse({
    ...base,
    logradouro: "A".repeat(44),
    numero: "160",
    complemento: "SALA 934",
    bairro: "CENTR",
  });
  assert.equal(address.street.length, 44);
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
