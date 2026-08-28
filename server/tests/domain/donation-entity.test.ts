import { test } from "node:test";
import assert from "node:assert/strict";
import { Donation } from "../../src/domain/donation/donation.entity.ts";
import { InvalidStatusTransitionError } from "../../src/domain/donation/donation.errors.ts";
import { asDonationId } from "../../src/domain/shared/branded.ts";
import { Cpf } from "../../src/domain/shared/cpf.ts";
import { Email } from "../../src/domain/shared/email.ts";
import { Money } from "../../src/domain/shared/money.ts";

const createdAt = new Date("2026-08-25T12:00:00.000Z");

function build() {
  return Donation.create({
    id: asDonationId("IPPS0123456789abcdef0123456789abcd"),
    amount: Money.fromReais(50),
    donor: {
      name: "Maria Silva",
      email: Email.parse("maria@exemplo.com"),
      cpf: Cpf.parse("52998224725"),
      address: null,
    },
    method: "pix",
    privacyTermsVersion: "2026-07-05",
    now: createdAt,
  });
}

test("nasce pendente e sem paymentId", () => {
  const donation = build();
  assert.equal(donation.status, "pendente");
  assert.equal(donation.paymentId, null);
  assert.deepEqual(donation.createdAt, createdAt);
});

test("attachPayment grava o paymentId e o status", () => {
  const donation = build();
  const later = new Date("2026-08-25T12:00:05.000Z");

  donation.attachPayment("abc-123", "pendente", later);

  assert.equal(donation.paymentId, "abc-123");
  assert.deepEqual(donation.updatedAt, later);
});

test("transitionTo respeita a maquina de estados", () => {
  const donation = build();
  const later = new Date("2026-08-25T12:30:00.000Z");

  donation.transitionTo("confirmada", later);
  assert.equal(donation.status, "confirmada");
  assert.deepEqual(donation.updatedAt, later);

  assert.throws(() => donation.transitionTo("pendente", later), InvalidStatusTransitionError);
});

test("transicao para o mesmo status nao mexe em updatedAt", () => {
  const donation = build();
  donation.transitionTo("pendente", new Date("2026-08-25T13:00:00.000Z"));
  assert.deepEqual(donation.updatedAt, createdAt);
});

test("snapshot guarda centavos e nunca o objeto de valor cru", () => {
  const donation = build();
  const snapshot = donation.toSnapshot();

  assert.equal(snapshot.amountCents, 5000);
  assert.equal(snapshot.donorCpf, "52998224725");
  assert.equal(snapshot.donorEmail, "maria@exemplo.com");
  assert.equal(snapshot.privacyTermsVersion, "2026-07-05");
});

test("restore reconstroi a entidade a partir do snapshot", () => {
  const original = build();
  original.attachPayment("abc-123", "confirmada", createdAt);

  const restored = Donation.restore(original.toSnapshot(), original.donor);

  assert.equal(restored.id, original.id);
  assert.equal(restored.status, "confirmada");
  assert.equal(restored.paymentId, "abc-123");
  assert.equal(restored.amount.cents, 5000);
});
