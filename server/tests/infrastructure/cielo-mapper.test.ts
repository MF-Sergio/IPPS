import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildSaleRequest,
  CieloResponseError,
  parsePaymentResult,
  parsePaymentSnapshot,
} from "../../src/infrastructure/cielo/cielo.mapper.ts";
import { buildAppConfig } from "../../src/infrastructure/config/app.config.ts";
import { Donation } from "../../src/domain/donation/donation.entity.ts";
import type { PaymentMethod } from "../../src/domain/donation/donation-status.ts";
import { Address } from "../../src/domain/shared/address.ts";
import { asDonationId } from "../../src/domain/shared/branded.ts";
import { CardCredentials } from "../../src/domain/shared/card-credentials.ts";
import { Cpf } from "../../src/domain/shared/cpf.ts";
import { Email } from "../../src/domain/shared/email.ts";
import { Money } from "../../src/domain/shared/money.ts";

const config = buildAppConfig({
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
  CIELO_BOLETO_IDENTIFICATION: "11.884.926/0001-54",
}).cielo;

const now = new Date("2026-08-25T12:00:00.000Z");

function buildDonation(method: PaymentMethod, withAddress = false) {
  return Donation.create({
    id: asDonationId("IPPS0123456789abcdef0123456789abcd"),
    amount: Money.fromReais(157),
    donor: {
      name: "Maria Silva",
      email: Email.parse("maria@exemplo.com"),
      cpf: Cpf.parse("52998224725"),
      address: withAddress
        ? Address.parse({
            logradouro: "Av Camara", numero: "160", complemento: "",
            bairro: "Centro", cidade: "Rio de Janeiro", uf: "RJ", cep: "22750012",
          })
        : null,
    },
    method,
    privacyTermsVersion: "2026-07-05",
    now,
  });
}

test("pix envia Amount em centavos e Identity obrigatorios", () => {
  const body = buildSaleRequest(buildDonation("pix"), { config, cardToken: null, card: null, now }) as any;

  assert.equal(body.MerchantOrderId, "IPPS0123456789abcdef0123456789abcd");
  assert.match(body.MerchantOrderId, /^[A-Za-z0-9]+$/);
  assert.equal(body.Payment.Type, "Pix");
  assert.equal(body.Payment.Amount, 15700);
  assert.equal(body.Customer.Identity, "52998224725");
  assert.equal(body.Customer.IdentityType, "CPF");
});

test("cartao envia CardToken e nunca o PAN", () => {
  const card = CardCredentials.parse({
    numero: "4532117080573703", titular: "Maria Silva",
    validade: "12/2030", cvv: "123", bandeira: "Visa",
  });
  const body = buildSaleRequest(buildDonation("cartao"), {
    config, cardToken: "token-abc", card, now,
  }) as any;

  assert.equal(body.Payment.Type, "CreditCard");
  assert.equal(body.Payment.Capture, true);
  assert.equal(body.Payment.Installments, 1);
  assert.equal(body.Payment.CreditCard.CardToken, "token-abc");
  assert.equal(body.Payment.CreditCard.Brand, "Visa");
  assert.ok(!JSON.stringify(body).includes("4532117080573703"));
});

test("boleto envia endereco normalizado e dados do cedente", () => {
  const body = buildSaleRequest(buildDonation("boleto", true), {
    config, cardToken: null, card: null, now,
  }) as any;

  assert.equal(body.Payment.Type, "Boleto");
  assert.equal(body.Payment.Provider, "Bradesco2");
  assert.equal(body.Payment.Identification, "11884926000154");
  assert.equal(body.Payment.ExpirationDate, "2026-08-28");
  assert.equal(body.Customer.Address.Street, "AV CAMARA");
  assert.equal(body.Customer.Address.ZipCode, "22750012");
  assert.equal(body.Customer.Name, "MARIA SILVA");
});

test("aceita as duas grafias do QR Code que a doc usa", () => {
  const donation = buildDonation("pix");
  const expiresAt = new Date("2026-08-25T14:00:00.000Z");

  const a = parsePaymentResult(
    { Payment: { PaymentId: "p1", Status: 12, QrCodeBase64Image: "AAA", QrCodeString: "000201" } },
    donation, expiresAt,
  );
  const b = parsePaymentResult(
    { Payment: { PaymentId: "p1", Status: 12, QrcodeBase64Image: "BBB", QrCodeString: "000201" } },
    donation, expiresAt,
  );

  assert.equal(a.method === "pix" && a.qrCodeBase64, "AAA");
  assert.equal(b.method === "pix" && b.qrCodeBase64, "BBB");
});

test("falha com erro claro quando o QR Code nao vem", () => {
  assert.throws(
    () => parsePaymentResult(
      { Payment: { PaymentId: "p1", Status: 12, QrCodeString: "000201" } },
      buildDonation("pix"), now,
    ),
    CieloResponseError,
  );
});

test("le a resposta de boleto", () => {
  const result = parsePaymentResult(
    {
      Payment: {
        PaymentId: "p2", Status: 1,
        Url: "https://cielo/boleto", DigitableLine: "00090.49420",
        BarCodeNumber: "00096629", ExpirationDate: "2026-08-28",
      },
    },
    buildDonation("boleto", true), now,
  );

  assert.equal(result.method, "boleto");
  assert.equal(result.status, "pendente");
  if (result.method === "boleto") {
    assert.equal(result.digitableLine, "00090.49420");
  }
});

test("le a resposta de cartao", () => {
  const result = parsePaymentResult(
    {
      Payment: {
        PaymentId: "p3", Status: 2, AuthorizationCode: "693066",
        CreditCard: { Brand: "Visa", CardNumber: "455187******0183" },
      },
    },
    buildDonation("cartao"), now,
  );

  assert.equal(result.method, "cartao");
  assert.equal(result.status, "confirmada");
  if (result.method === "cartao") {
    assert.equal(result.lastDigits, "0183");
    assert.equal(result.authorizationCode, "693066");
  }
});

test("parsePaymentSnapshot le o MerchantOrderId, que e o id da doacao", () => {
  const snapshot = parsePaymentSnapshot({
    MerchantOrderId: "IPPS0123456789abcdef0123456789abcd",
    Payment: { PaymentId: "p1", Status: 2, Type: "Pix" },
  });

  assert.equal(snapshot.orderId, "IPPS0123456789abcdef0123456789abcd");
  assert.equal(snapshot.status, "confirmada");
  assert.equal(snapshot.method, "pix");
  assert.equal(snapshot.rawStatusCode, 2);
});

test("parsePaymentSnapshot falha em resposta sem PaymentId", () => {
  assert.throws(() => parsePaymentSnapshot({ Payment: {} }), CieloResponseError);
});
