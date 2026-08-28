import type { Donation } from "../donation/donation.entity.ts";
import type { DonationStatus, PaymentMethod } from "../donation/donation-status.ts";
import type { CardCredentials } from "../shared/card-credentials.ts";
import type { Money } from "../shared/money.ts";

export interface CreatePaymentInput {
  donation: Donation;
  card: CardCredentials | null;
  /** Calculado pelo caso de uso: para pix, `now + 2h`. */
  expiresAt: Date;
}

export type PaymentResult =
  | {
      method: "pix";
      paymentId: string;
      status: DonationStatus;
      qrCodeBase64: string;
      qrCodeString: string;
      expiresAt: Date;
    }
  | {
      method: "boleto";
      paymentId: string;
      status: DonationStatus;
      url: string;
      digitableLine: string;
      barCode: string;
      dueDate: Date;
    }
  | {
      method: "cartao";
      paymentId: string;
      status: DonationStatus;
      brand: string;
      lastDigits: string;
      authorizationCode: string | null;
    };

export interface PaymentSnapshot {
  paymentId: string;
  /** MerchantOrderId na Cielo — e o id da nossa doacao. */
  orderId: string;
  status: DonationStatus;
  method: PaymentMethod;
  rawStatusCode: number;
}

export interface PaymentGatewayPort {
  createPayment(input: CreatePaymentInput): Promise<PaymentResult>;
  getPaymentById(paymentId: string): Promise<PaymentSnapshot>;
  findPaymentByOrderId(orderId: string): Promise<PaymentSnapshot | null>;
  capturePayment(paymentId: string, amount?: Money): Promise<PaymentSnapshot>;
  voidPayment(paymentId: string, amount?: Money): Promise<PaymentSnapshot>;
}
