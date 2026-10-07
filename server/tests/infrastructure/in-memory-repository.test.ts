import { test } from "node:test";
import assert from "node:assert/strict";
import { InMemoryDonationRepository } from "../../src/infrastructure/persistence/in-memory-donation.repository.ts";
import { Donation } from "../../src/domain/donation/donation.entity.ts";
import { asDonationId } from "../../src/domain/shared/branded.ts";
import { Cpf } from "../../src/domain/shared/cpf.ts";
import { Email } from "../../src/domain/shared/email.ts";
import { Money } from "../../src/domain/shared/money.ts";

const now = new Date("2026-08-25T12:00:00.000Z");

function build(id: string) {
  return Donation.create({
    id: asDonationId(id),
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

test("guarda e recupera por id", async () => {
  const repository = new InMemoryDonationRepository();
  const donation = build("IPPS1");

  await repository.save(donation);

  const found = await repository.findById("IPPS1");
  assert.equal(found?.id, "IPPS1");
  assert.equal(found?.amount.cents, 5000);
  assert.equal(found?.donor.email.value, "maria@exemplo.com");
});

test("recupera por paymentId", async () => {
  const repository = new InMemoryDonationRepository();
  const donation = build("IPPS2");
  donation.attachPayment("pay-9", "pendente", now);

  await repository.save(donation);

  assert.equal((await repository.findByPaymentId("pay-9"))?.id, "IPPS2");
});

test("devolve null para o que nao existe", async () => {
  const repository = new InMemoryDonationRepository();
  assert.equal(await repository.findById("nada"), null);
  assert.equal(await repository.findByPaymentId("nada"), null);
});

test("salvar de novo sobrescreve o estado anterior", async () => {
  const repository = new InMemoryDonationRepository();
  const donation = build("IPPS3");
  await repository.save(donation);

  donation.transitionTo("confirmada", now);
  await repository.save(donation);

  assert.equal((await repository.findById("IPPS3"))?.status, "confirmada");
});

test("nao devolve a mesma instancia guardada, para nao vazar mutacao", async () => {
  const repository = new InMemoryDonationRepository();
  const donation = build("IPPS4");
  await repository.save(donation);

  const found = await repository.findById("IPPS4");
  assert.notEqual(found, donation);
  assert.equal(found?.id, donation.id);
});
