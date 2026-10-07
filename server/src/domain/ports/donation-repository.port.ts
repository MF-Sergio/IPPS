import type { Donation } from "../donation/donation.entity.ts";

export type DonationStatusChangeSource =
  | "create"
  | "polling"
  | "webhook"
  | "expiration";

// A origem permite auditar por que uma doacao mudou de status.
export interface DonationRepositoryPort {
  save(
    donation: Donation,
    source?: DonationStatusChangeSource,
  ): Promise<void>;
  findById(id: string): Promise<Donation | null>;
  findByPaymentId(paymentId: string): Promise<Donation | null>;
}
