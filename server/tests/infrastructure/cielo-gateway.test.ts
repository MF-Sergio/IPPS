import { test } from "node:test";
import assert from "node:assert/strict";
import { createCieloClient } from "../../src/infrastructure/cielo/cielo.client.ts";
import { createCieloGateway } from "../../src/infrastructure/cielo/cielo-payment.gateway.ts";
import { CieloHttpError } from "../../src/infrastructure/cielo/cielo.errors.ts";
import { buildAppConfig } from "../../src/infrastructure/config/app.config.ts";
import { Donation } from "../../src/domain/donation/donation.entity.ts";
import { asDonationId } from "../../src/domain/shared/branded.ts";
import { CardCredentials } from "../../src/domain/shared/card-credentials.ts";
import { Cpf } from "../../src/domain/shared/cpf.ts";
import { Email } from "../../src/domain/shared/email.ts";
import { Money } from "../../src/domain/shared/money.ts";
import { FakeLogger } from "../fakes/fake-logger.ts";

const config = buildAppConfig({
  CIELO_MERCHANT_ID: "11111111-1111-1111-1111-111111111111",
  CIELO_MERCHANT_KEY: "0123456789012345678901234567890123456789",
}).cielo;

const now = new Date("2026-08-25T12:00:00.000Z");

interface Call { url: string; init: RequestInit }

function stubFetch(responses: Array<{ status: number; body: unknown }>) {
  const calls: Call[] = [];
  let index = 0;

  const fetchImpl = (async (url: string | URL, init?: RequestInit) => {
    calls.push({ url: String(url), init: init ?? {} });
    const response = responses[Math.min(index, responses.length - 1)];
    index += 1;
    return new Response(JSON.stringify(response?.body ?? {}), {
      status: response?.status ?? 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as unknown as typeof fetch;

  return { fetchImpl, calls };
}

function buildGateway(responses: Array<{ status: number; body: unknown }>) {
  const { fetchImpl, calls } = stubFetch(responses);
  const logger = new FakeLogger();
  const client = createCieloClient(config, fetchImpl, logger);
  return { gateway: createCieloGateway({ config, client, logger }), calls, logger };
}

function pixDonation() {
  return Donation.create({
    id: asDonationId("IPPS0123456789abcdef0123456789abcd"),
    amount: Money.fromReais(50),
    donor: {
      name: "Maria Silva", email: Email.parse("maria@exemplo.com"),
      cpf: Cpf.parse("52998224725"), address: null,
    },
    method: "pix",
    privacyTermsVersion: "2026-07-05",
    now,
  });
}

test("envia os headers de autenticacao no host transacional", async () => {
  const { gateway, calls } = buildGateway([
    { status: 201, body: { Payment: { PaymentId: "p1", Status: 12, QrCodeBase64Image: "AAA", QrCodeString: "000201" } } },
  ]);

  await gateway.createPayment({ donation: pixDonation(), card: null, expiresAt: now });

  const call = calls[0];
  assert.ok(call?.url.startsWith("https://apisandbox.cieloecommerce.cielo.com.br/1/sales"));
  const headers = new Headers(call?.init.headers);
  assert.equal(headers.get("MerchantId"), "11111111-1111-1111-1111-111111111111");
  assert.equal(headers.get("MerchantKey"), "0123456789012345678901234567890123456789");
  assert.match(String(headers.get("RequestId")), /^[0-9a-f-]{36}$/);
});

test("consulta usa o host de consulta, nao o transacional", async () => {
  const { gateway, calls } = buildGateway([
    { status: 200, body: { MerchantOrderId: "IPPS1", Payment: { PaymentId: "p1", Status: 2, Type: "Pix" } } },
  ]);

  await gateway.getPaymentById("p1");

  assert.ok(calls[0]?.url.startsWith("https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/p1"));
});

test("cartao tokeniza antes de cobrar e nunca envia o PAN na venda", async () => {
  const { gateway, calls } = buildGateway([
    { status: 201, body: { CardToken: "token-abc" } },
    { status: 201, body: { Payment: { PaymentId: "p3", Status: 2, AuthorizationCode: "693066", CreditCard: { Brand: "Visa", CardNumber: "453211******3703" } } } },
  ]);

  const donation = Donation.create({
    id: asDonationId("IPPS0123456789abcdef0123456789abcd"),
    amount: Money.fromReais(50),
    donor: {
      name: "Maria Silva", email: Email.parse("maria@exemplo.com"),
      cpf: Cpf.parse("52998224725"), address: null,
    },
    method: "cartao",
    privacyTermsVersion: "2026-07-05",
    now,
  });

  const card = CardCredentials.parse({
    numero: "4532117080573703", titular: "Maria Silva",
    validade: "12/2030", cvv: "123", bandeira: "Visa",
  });

  const result = await gateway.createPayment({ donation, card, expiresAt: now });

  assert.equal(calls.length, 2);
  assert.ok(calls[0]?.url.endsWith("/1/card/"));
  assert.ok(String(calls[0]?.init.body).includes("4532117080573703"));
  assert.ok(calls[1]?.url.endsWith("/1/sales/"));
  assert.ok(!String(calls[1]?.init.body).includes("4532117080573703"));
  assert.ok(String(calls[1]?.init.body).includes("token-abc"));
  assert.equal(result.status, "confirmada");
});

test("traduz erro HTTP da Cielo em CieloHttpError com o codigo dela", async () => {
  const { gateway } = buildGateway([
    { status: 400, body: [{ Code: 126, Message: "Credit Card Number is invalid" }] },
  ]);

  await assert.rejects(
    () => gateway.createPayment({ donation: pixDonation(), card: null, expiresAt: now }),
    (error: unknown) => {
      assert.ok(error instanceof CieloHttpError);
      assert.equal(error.status, 400);
      assert.equal(error.cieloCode, "126");
      return true;
    },
  );
});

test("nunca loga o PAN nem o CVV mesmo em erro", async () => {
  const { gateway, logger } = buildGateway([{ status: 500, body: { Message: "erro" } }]);

  await assert.rejects(() =>
    gateway.createPayment({ donation: pixDonation(), card: null, expiresAt: now }),
  );

  assert.ok(!JSON.stringify(logger.entries).includes("0123456789012345678901234567890123456789"));
});

test("findPaymentByOrderId devolve null quando a Cielo nao acha o pedido", async () => {
  const { gateway } = buildGateway([{ status: 404, body: {} }]);
  assert.equal(await gateway.findPaymentByOrderId("IPPSinexistente"), null);
});
