import type { Donation } from "../donation/donation.entity.ts";

export interface DonationRepositoryPort {
  save(donation: Donation): Promise<void>;
  findById(id: string): Promise<Donation | null>;
  findByPaymentId(paymentId: string): Promise<Donation | null>;
}
