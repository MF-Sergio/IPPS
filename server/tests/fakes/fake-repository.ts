import type { DonationRepositoryPort } from "../../src/domain/ports/donation-repository.port.ts";
import type { Donation } from "../../src/domain/donation/donation.entity.ts";

export class FakeRepository implements DonationRepositoryPort {
  readonly saved: Donation[] = [];
  #byId = new Map<string, Donation>();

  async save(donation: Donation): Promise<void> {
    this.saved.push(donation);
    this.#byId.set(donation.id, donation);
  }

  async findById(id: string): Promise<Donation | null> {
    return this.#byId.get(id) ?? null;
  }

  async findByPaymentId(paymentId: string): Promise<Donation | null> {
    for (const donation of this.#byId.values()) {
      if (donation.paymentId === paymentId) return donation;
    }
    return null;
  }
}
