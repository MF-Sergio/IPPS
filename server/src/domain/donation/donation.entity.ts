import type { DonationId } from "../shared/branded.ts";
import { asDonationId } from "../shared/branded.ts";
import type { Address } from "../shared/address.ts";
import type { Cpf } from "../shared/cpf.ts";
import type { Email } from "../shared/email.ts";
import { Money } from "../shared/money.ts";
import type { DonationStatus, PaymentMethod } from "./donation-status.ts";
import { assertTransition } from "./donation-status.ts";

export interface Donor {
  name: string;
  email: Email;
  cpf: Cpf;
  address: Address | null;
}

export interface DonationSnapshot {
  id: string;
  amountCents: number;
  donorName: string;
  donorEmail: string;
  donorCpf: string;
  method: PaymentMethod;
  status: DonationStatus;
  paymentId: string | null;
  privacyTermsVersion: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDonationEntityInput {
  id: DonationId;
  amount: Money;
  donor: Donor;
  method: PaymentMethod;
  privacyTermsVersion: string;
  now: Date;
}

export class Donation {
  readonly id: DonationId;
  readonly amount: Money;
  readonly donor: Donor;
  readonly method: PaymentMethod;
  readonly privacyTermsVersion: string;
  readonly createdAt: Date;

  #status: DonationStatus;
  #paymentId: string | null;
  #updatedAt: Date;

  private constructor(fields: {
    id: DonationId;
    amount: Money;
    donor: Donor;
    method: PaymentMethod;
    privacyTermsVersion: string;
    status: DonationStatus;
    paymentId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = fields.id;
    this.amount = fields.amount;
    this.donor = fields.donor;
    this.method = fields.method;
    this.privacyTermsVersion = fields.privacyTermsVersion;
    this.createdAt = fields.createdAt;
    this.#status = fields.status;
    this.#paymentId = fields.paymentId;
    this.#updatedAt = fields.updatedAt;
  }

  static create(input: CreateDonationEntityInput): Donation {
    return new Donation({
      id: input.id,
      amount: input.amount,
      donor: input.donor,
      method: input.method,
      privacyTermsVersion: input.privacyTermsVersion,
      status: "pendente",
      paymentId: null,
      createdAt: input.now,
      updatedAt: input.now,
    });
  }

  static restore(snapshot: DonationSnapshot, donor: Donor): Donation {
    return new Donation({
      id: asDonationId(snapshot.id),
      amount: Money.fromCents(snapshot.amountCents),
      donor,
      method: snapshot.method,
      privacyTermsVersion: snapshot.privacyTermsVersion,
      status: snapshot.status,
      paymentId: snapshot.paymentId,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    });
  }

  get status(): DonationStatus {
    return this.#status;
  }

  get paymentId(): string | null {
    return this.#paymentId;
  }

  get updatedAt(): Date {
    return this.#updatedAt;
  }

  attachPayment(paymentId: string, status: DonationStatus, now: Date): void {
    assertTransition(this.#status, status);
    this.#paymentId = paymentId;
    this.#status = status;
    this.#updatedAt = now;
  }

  transitionTo(status: DonationStatus, now: Date): void {
    assertTransition(this.#status, status);
    // Reconsulta que devolve o mesmo status nao e mudanca: nao suja updatedAt.
    if (status === this.#status) return;
    this.#status = status;
    this.#updatedAt = now;
  }

  toSnapshot(): DonationSnapshot {
    return {
      id: this.id,
      amountCents: this.amount.cents,
      donorName: this.donor.name,
      donorEmail: this.donor.email.value,
      donorCpf: this.donor.cpf.digits,
      method: this.method,
      status: this.#status,
      paymentId: this.#paymentId,
      privacyTermsVersion: this.privacyTermsVersion,
      createdAt: this.createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}
