import { Donation } from "../../domain/donation/donation.entity.ts";
import type { Donor, DonationSnapshot } from "../../domain/donation/donation.entity.ts";
import type { DonationRepositoryPort } from "../../domain/ports/donation-repository.port.ts";
import { Cpf } from "../../domain/shared/cpf.ts";
import { Email } from "../../domain/shared/email.ts";

interface StoredDonation {
  snapshot: DonationSnapshot;
  address: Donor["address"];
}

/**
 * Adapter de desenvolvimento. Em Vercel Functions cada invocacao pode ser uma
 * instancia nova, entao este repositorio nao persiste de verdade em producao —
 * ver `schema.sql` para o adapter Postgres que o substitui.
 *
 * O sistema continua correto sem ele porque a Cielo e a fonte de verdade do
 * status: `get-donation-status.usecase.ts` recupera tudo por MerchantOrderId.
 */
export class InMemoryDonationRepository implements DonationRepositoryPort {
  #store = new Map<string, StoredDonation>();

  async save(donation: Donation): Promise<void> {
    this.#store.set(donation.id, {
      snapshot: donation.toSnapshot(),
      address: donation.donor.address,
    });
  }

  async findById(id: string): Promise<Donation | null> {
    const stored = this.#store.get(id);
    return stored ? this.#restore(stored) : null;
  }

  async findByPaymentId(paymentId: string): Promise<Donation | null> {
    for (const stored of this.#store.values()) {
      if (stored.snapshot.paymentId === paymentId) {
        return this.#restore(stored);
      }
    }
    return null;
  }

  #restore(stored: StoredDonation): Donation {
    return Donation.restore(stored.snapshot, {
      name: stored.snapshot.donorName,
      email: Email.parse(stored.snapshot.donorEmail),
      cpf: Cpf.parse(stored.snapshot.donorCpf),
      address: stored.address,
    });
  }
}
