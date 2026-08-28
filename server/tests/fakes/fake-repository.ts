import type { DonationRepositoryPort } from "../../src/domain/ports/donation-repository.port.ts";
import type { Donation, DonationSnapshot } from "../../src/domain/donation/donation.entity.ts";
import { Donation as DonationEntity } from "../../src/domain/donation/donation.entity.ts";
import type { Address } from "../../src/domain/shared/address.ts";
import { Cpf } from "../../src/domain/shared/cpf.ts";
import { Email } from "../../src/domain/shared/email.ts";

interface StoredDonation {
  snapshot: DonationSnapshot;
  address: Address | null;
}

/**
 * Guarda um snapshot (nao a referencia viva) e reconstroi via `Donation.restore`
 * em cada leitura — como o repositorio real (Task 16) faz. Isso pega casos em
 * que um caso de uso muta uma entidade lida e esquece de chamar `save()`.
 */
export class FakeRepository implements DonationRepositoryPort {
  readonly saved: Donation[] = [];
  #byId = new Map<string, StoredDonation>();

  async save(donation: Donation): Promise<void> {
    this.saved.push(donation);
    this.#byId.set(donation.id, {
      snapshot: donation.toSnapshot(),
      address: donation.donor.address,
    });
  }

  async findById(id: string): Promise<Donation | null> {
    const stored = this.#byId.get(id);
    return stored ? this.#restore(stored) : null;
  }

  async findByPaymentId(paymentId: string): Promise<Donation | null> {
    for (const stored of this.#byId.values()) {
      if (stored.snapshot.paymentId === paymentId) return this.#restore(stored);
    }
    return null;
  }

  #restore(stored: StoredDonation): Donation {
    return DonationEntity.restore(stored.snapshot, {
      name: stored.snapshot.donorName,
      email: Email.parse(stored.snapshot.donorEmail),
      cpf: Cpf.parse(stored.snapshot.donorCpf),
      address: stored.address,
    });
  }
}
