import { test } from "node:test";
import assert from "node:assert/strict";
import { redact } from "../../src/infrastructure/logging/redact.ts";

test("mascara campos sensiveis em qualquer profundidade", () => {
  const output = redact({
    CardNumber: "4532117080573703",
    payment: { SecurityCode: "123", CardToken: "abc", Brand: "Visa" },
    headers: { MerchantKey: "0123456789" },
    donor: { Identity: "52998224725", cpf: "52998224725" },
  });

  const serialized = JSON.stringify(output);
  assert.ok(!serialized.includes("4532117080573703"));
  assert.ok(!serialized.includes("0123456789"));
  assert.ok(!serialized.includes("52998224725"));
  assert.ok(serialized.includes("Visa"));
});

test("mascara independente de caixa", () => {
  const output = redact({ cardnumber: "4532117080573703", cvv: "123" });
  assert.ok(!JSON.stringify(output).includes("4532117080573703"));
  assert.ok(!JSON.stringify(output).includes("123"));
});

test("preserva valores nao sensiveis e nao quebra em null", () => {
  const output = redact({ donationId: "IPPS1", amountCents: 5000, nada: null });
  assert.deepEqual(output, { donationId: "IPPS1", amountCents: 5000, nada: null });
});

test("nao entra em laco infinito com referencia circular", () => {
  const circular: Record<string, unknown> = { nome: "teste" };
  circular["self"] = circular;
  assert.doesNotThrow(() => redact(circular));
});

test("mascara o segredo do webhook (notificationHeaderValue/Name)", () => {
  const output = redact({
    cielo: {
      notificationHeaderName: "X-Webhook-Secret",
      notificationHeaderValue: "s3gr3d0-super-secreto",
    },
  });

  const serialized = JSON.stringify(output);
  assert.ok(!serialized.includes("s3gr3d0-super-secreto"));
  assert.ok(!serialized.includes("X-Webhook-Secret"));
});
