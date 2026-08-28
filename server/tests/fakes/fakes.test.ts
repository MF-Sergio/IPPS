import { test } from "node:test";
import assert from "node:assert/strict";
import { FakeClock } from "./fake-clock.ts";
import { FakeLogger } from "./fake-logger.ts";
import { FakeRepository } from "./fake-repository.ts";
import { FakeGateway } from "./fake-gateway.ts";
import { Donation } from "../../src/domain/donation/donation.entity.ts";
import { asDonationId } from "../../src/domain/shared/branded.ts";
import { Cpf } from "../../src/domain/shared/cpf.ts";
import { Email } from "../../src/domain/shared/email.ts";
import { Money } from "../../src/domain/shared/money.ts";

const donor = {
  name: "Maria Silva",
  email: Email.parse("maria@exemplo.com"),
  cpf: Cpf.parse("52998224725"),
  address: null,
};

function buildDonation(clock: FakeClock) {
  return Donation.create({
    id: asDonationId(clock.newId()),
    amount: Money.fromReais(50),
    donor,
    method: "pix",
    privacyTermsVersion: "2026-07-05",
    now: clock.now(),
  });
}

test("FakeClock e deterministico e avanca sob comando", () => {
  const clock = new FakeClock(new Date("2026-08-25T12:00:00.000Z"));

  assert.deepEqual(clock.now(), new Date("2026-08-25T12:00:00.000Z"));
  assert.equal(clock.newId(), "IPPS00000000000000000000000000000001");
  assert.equal(clock.newId(), "IPPS00000000000000000000000000000002");

  clock.advanceMinutes(30);
  assert.deepEqual(clock.now(), new Date("2026-08-25T12:30:00.000Z"));
});

test("FakeClock gera id alfanumerico de 36 caracteres", () => {
  const id = new FakeClock(new Date()).newId();
  assert.equal(id.length, 36);
  assert.match(id, /^[A-Za-z0-9]+$/);
});

test("FakeRepository guarda e busca por id e por paymentId", async () => {
  const clock = new FakeClock(new Date("2026-08-25T12:00:00.000Z"));
  const repository = new FakeRepository();
  const donation = buildDonation(clock);

  donation.attachPayment("pay-1", "pendente", clock.now());
  await repository.save(donation);

  assert.equal((await repository.findById(donation.id))?.id, donation.id);
  assert.equal((await repository.findByPaymentId("pay-1"))?.id, donation.id);
  assert.equal(await repository.findById("inexistente"), null);
  assert.equal(await repository.findByPaymentId("inexistente"), null);
});

test("FakeGateway devolve resultado de pix e registra as chamadas", async () => {
  const clock = new FakeClock(new Date("2026-08-25T12:00:00.000Z"));
  const gateway = new FakeGateway(clock);
  const donation = buildDonation(clock);

  const result = await gateway.createPayment({ donation, card: null, expiresAt: clock.now() });

  assert.equal(result.method, "pix");
  assert.equal(result.status, "pendente");
  assert.equal(gateway.createCalls.length, 1);
  if (result.method === "pix") {
    assert.ok(result.qrCodeString.length > 0);
  }
});

test("FakeGateway pode ser instruido a falhar", async () => {
  const clock = new FakeClock(new Date("2026-08-25T12:00:00.000Z"));
  const gateway = new FakeGateway(clock);
  gateway.failNextCreate(new Error("gateway fora do ar"));

  await assert.rejects(
    () => gateway.createPayment({ donation: buildDonation(clock), card: null, expiresAt: clock.now() }),
    /gateway fora do ar/,
  );
});

test("FakeLogger acumula o que foi registrado", () => {
  const logger = new FakeLogger();
  logger.info("criou doacao", { id: "IPPS1" });
  assert.equal(logger.entries.length, 1);
  assert.equal(logger.entries[0]?.level, "info");
});
