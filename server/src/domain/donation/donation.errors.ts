/**
 * `statusHint` deixa o dominio expressar gravidade sem conhecer HTTP.
 * Quem traduz para codigo de resposta e `router/error-handler.ts`.
 */
export class DomainError extends Error {
  readonly code: string;
  readonly statusHint: number;

  constructor(code: string, message: string, statusHint = 400) {
    super(message);
    this.name = "DomainError";
    this.code = code;
    this.statusHint = statusHint;
  }
}

export class ValidationError extends DomainError {
  readonly details: Record<string, string>;

  constructor(message: string, details: Record<string, string>) {
    super("VALIDATION_ERROR", message, 400);
    this.name = "ValidationError";
    this.details = details;
  }
}

export class InvalidStatusTransitionError extends DomainError {
  constructor(from: string, to: string) {
    super("INVALID_STATUS_TRANSITION", `Transicao invalida de ${from} para ${to}.`, 409);
    this.name = "InvalidStatusTransitionError";
  }
}

export class DonationNotFoundError extends DomainError {
  constructor(id: string) {
    super("DONATION_NOT_FOUND", `Doacao ${id} nao encontrada.`, 404);
    this.name = "DonationNotFoundError";
  }
}
