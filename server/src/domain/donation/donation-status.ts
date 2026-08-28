import { InvalidStatusTransitionError } from "./donation.errors.ts";

export type DonationStatus =
  | "pendente"
  | "autorizada"
  | "confirmada"
  | "negada"
  | "cancelada"
  | "falhou"
  | "expirada";

export type PaymentMethod = "pix" | "cartao" | "boleto";

const PAYMENT_METHODS: readonly string[] = ["pix", "cartao", "boleto"];

const TRANSITIONS: Record<DonationStatus, readonly DonationStatus[]> = {
  pendente: ["autorizada", "confirmada", "negada", "falhou", "expirada"],
  autorizada: ["confirmada", "cancelada", "falhou"],
  confirmada: ["cancelada"],
  negada: [],
  cancelada: [],
  falhou: [],
  expirada: [],
};

export function isPaymentMethod(value: unknown): value is PaymentMethod {
  return typeof value === "string" && PAYMENT_METHODS.includes(value);
}

export function isTerminal(status: DonationStatus): boolean {
  return TRANSITIONS[status].length === 0;
}

export function canTransition(from: DonationStatus, to: DonationStatus): boolean {
  // Reconsultar a Cielo e receber o mesmo status e o caso comum, nao um erro.
  if (from === to) return true;
  return TRANSITIONS[from].includes(to);
}

export function assertTransition(from: DonationStatus, to: DonationStatus): void {
  if (!canTransition(from, to)) {
    throw new InvalidStatusTransitionError(from, to);
  }
}
