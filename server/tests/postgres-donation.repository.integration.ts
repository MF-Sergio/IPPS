import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { clearDatabase, closeDatabase, testPool } from "./helpers/database.ts";
import { Donation } from "../src/domain/donation/donation.entity.ts";
import { asDonationId } from "../src/domain/shared/branded.ts";
import { Cpf } from "../src/domain/shared/cpf.ts";
import { Email } from "../src/domain/shared/email.ts";
import { Money } from "../src/domain/shared/money.ts";

const { PostgresDonationRepository } = await import(
  "../src/infrastructure/persistence/postgres-donation.repository.ts"
);

const repository = new PostgresDonationRepository();
const now = new Date("2026-09-10T12:00:00.000Z");

function buildDonation(id: string): Donation {
  return Donation.create({
    id: asDonationId(id),
    amount: Money.fromReais(25),
    donor: {
      name: "Maria Silva",
      email: Email.parse("maria@exemplo.com"),
      cpf: Cpf.parse("52998224725"),
      address: null,
    },
    method: "pix",
    privacyTermsVersion: "2026-07-05",
    now,
  });
}

beforeEach(async () => {
  await clearDatabase();
});

after(async () => {
  await closeDatabase();
});

test("salva e recupera uma doacao por id", async () => {
  const donation = buildDonation("IPPSTESTREPO001");

  await repository.save(donation, "create");

  const found = await repository.findById(donation.id);
  assert.equal(found?.id, donation.id);
  assert.equal(found?.amount.cents, 2500);
  assert.equal(found?.status, "pendente");
});

// Confirma simultaneamente a busca por paymentId e a auditoria do webhook.
test("recupera uma doacao por paymentId e grava o historico", async () => {
  const donation = buildDonation("IPPSTESTREPO002");
  donation.attachPayment("payment-test-002", "confirmada", now);

  await repository.save(donation, "webhook");

  const found = await repository.findByPaymentId("payment-test-002");
  const history = await testPool.query(
    "SELECT from_status, to_status, source FROM donation_status_history WHERE donation_id = $1",
    [donation.id],
  );

  assert.equal(found?.id, donation.id);
  assert.deepEqual(history.rows, [
    { from_status: null, to_status: "confirmada", source: "webhook" },
  ]);
});