import { test } from "node:test";
import assert from "node:assert/strict";
import { parseCreateDonationRequest } from "../../src/router/dto/create-donation.request.ts";
import { toDonationResponse, toStatusResponse } from "../../src/router/dto/donation.response.ts";
import { ValidationError } from "../../src/domain/donation/donation.errors.ts";
import { Donation } from "../../src/domain/donation/donation.entity.ts";
import { asDonationId } from "../../src/domain/shared/branded.ts";
import { Cpf } from "../../src/domain/shared/cpf.ts";
import { Email } from "../../src/domain/shared/email.ts";
import { Money } from "../../src/domain/shared/money.ts";

test("extrai apenas os campos do contrato, ignorando o resto", () => {
  const input = parseCreateDonationRequest({
    valor: 50, nome: "Maria", email: "maria@exemplo.com", cpf: "52998224725",
    metodoPagamento: "pix", aceitePrivacidade: true,
    admin: true, status: "confirmada",
  });

  assert.equal(input.valor, 50);
  assert.equal(input.metodoPagamento, "pix");
  assert.equal(input.cartao, null);
  assert.equal(input.endereco, null);
  assert.ok(!("admin" in input));
  assert.ok(!("status" in input));
});

test("rejeita metodo de pagamento invalido", () => {
  assert.throws(
    () => parseCreateDonationRequest({ valor: 50, metodoPagamento: "cripto" }),
    (error: unknown) => error instanceof ValidationError && "metodoPagamento" in error.details,
  );
});

test("rejeita corpo que nao e objeto", () => {
  assert.throws(() => parseCreateDonationRequest(null), ValidationError);
  assert.throws(() => parseCreateDonationRequest([]), ValidationError);
});

test("resposta de pix carrega so o bloco de pix", () => {
  const donation = Donation.create({
    id: asDonationId("IPPS1"), amount: Money.fromReais(50),
    donor: {
      name: "Maria", email: Email.parse("maria@exemplo.com"),
      cpf: Cpf.parse("52998224725"), address: null,
    },
    method: "pix", privacyTermsVersion: "2026-07-05",
    now: new Date("2026-08-25T12:00:00.000Z"),
  });

  const body = toDonationResponse(donation, {
    method: "pix", paymentId: "p1", status: "pendente",
    qrCodeBase64: "AAA", qrCodeString: "000201",
    expiresAt: new Date("2026-08-25T14:00:00.000Z"),
  }) as Record<string, unknown>;

  assert.equal(body["id"], "IPPS1");
  assert.equal(body["valor"], 50);
  assert.ok("pix" in body);
  assert.ok(!("boleto" in body));
  assert.ok(!("cartao" in body));
  // O paymentId da Cielo nao vaza para o navegador.
  assert.ok(!JSON.stringify(body).includes("p1"));
});

test("resposta de status expoe apenas id, status e data", () => {
  const body = toStatusResponse({
    id: "IPPS1", status: "confirmada", updatedAt: new Date("2026-08-25T12:30:00.000Z"),
  });

  assert.deepEqual(Object.keys(body).sort(), ["atualizadoEm", "id", "status"]);
});
