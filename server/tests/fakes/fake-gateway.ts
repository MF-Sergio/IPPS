import type {
  CreatePaymentInput,
  PaymentGatewayPort,
  PaymentResult,
  PaymentSnapshot,
} from "../../src/domain/ports/payment-gateway.port.ts";
import type { ClockPort } from "../../src/domain/ports/clock.port.ts";
import type { DonationStatus } from "../../src/domain/donation/donation-status.ts";

export class FakeGateway implements PaymentGatewayPort {
  readonly createCalls: CreatePaymentInput[] = [];
  readonly snapshots = new Map<string, PaymentSnapshot>();

  #clock: ClockPort;
  #counter = 0;
  #nextCreateError: Error | null = null;
  #nextCreateStatus: DonationStatus | null = null;

  constructor(clock: ClockPort) {
    this.#clock = clock;
  }

  failNextCreate(error: Error): void {
    this.#nextCreateError = error;
  }

  setNextCreateStatus(status: DonationStatus): void {
    this.#nextCreateStatus = status;
  }

  setSnapshot(snapshot: PaymentSnapshot): void {
    this.snapshots.set(snapshot.paymentId, snapshot);
  }

  async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
    this.createCalls.push(input);

    if (this.#nextCreateError) {
      const error = this.#nextCreateError;
      this.#nextCreateError = null;
      throw error;
    }

    this.#counter += 1;
    const paymentId = `pay-${this.#counter}`;
    const method = input.donation.method;
    const status = this.#nextCreateStatus ?? (method === "cartao" ? "confirmada" : "pendente");
    this.#nextCreateStatus = null;

    this.snapshots.set(paymentId, {
      paymentId,
      orderId: input.donation.id,
      status,
      method,
      rawStatusCode: status === "confirmada" ? 2 : 12,
    });

    if (method === "pix") {
      return {
        method: "pix", paymentId, status,
        qrCodeBase64: "ZmFrZS1xcg==",
        qrCodeString: "00020101021226880014br.gov.bcb.pix",
        expiresAt: input.expiresAt,
      };
    }

    if (method === "boleto") {
      return {
        method: "boleto", paymentId, status,
        url: `https://fake.cielo/boleto/${paymentId}`,
        digitableLine: "00090.49420 50000.000013 23006.565602 6 62990000015700",
        barCode: "00096629900000157000494250000000012300656560",
        dueDate: new Date(this.#clock.now().getTime() + 3 * 86_400_000),
      };
    }

    return {
      method: "cartao", paymentId, status,
      brand: "Visa", lastDigits: "3703", authorizationCode: "693066",
    };
  }

  async getPaymentById(paymentId: string): Promise<PaymentSnapshot> {
    const snapshot = this.snapshots.get(paymentId);
    if (!snapshot) throw new Error(`pagamento ${paymentId} nao existe no fake`);
    return snapshot;
  }

  async findPaymentByOrderId(orderId: string): Promise<PaymentSnapshot | null> {
    for (const snapshot of this.snapshots.values()) {
      if (snapshot.orderId === orderId) return snapshot;
    }
    return null;
  }

  async capturePayment(paymentId: string): Promise<PaymentSnapshot> {
    const snapshot = await this.getPaymentById(paymentId);
    const captured: PaymentSnapshot = { ...snapshot, status: "confirmada", rawStatusCode: 2 };
    this.snapshots.set(paymentId, captured);
    return captured;
  }

  async voidPayment(paymentId: string): Promise<PaymentSnapshot> {
    const snapshot = await this.getPaymentById(paymentId);
    const voided: PaymentSnapshot = { ...snapshot, status: "cancelada", rawStatusCode: 10 };
    this.snapshots.set(paymentId, voided);
    return voided;
  }
}
