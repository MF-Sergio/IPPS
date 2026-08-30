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

/**
 * A mensagem e generica de proposito: `from`/`to` sao vocabulario interno do
 * dominio (nomes de status) e nunca devem chegar ao doador — o handler de
 * erro devolve `message` verbatim para qualquer `DomainError`. Quem precisa
 * do detalhe usa os campos `from`/`to`, tipicamente so em log.
 */
export class InvalidStatusTransitionError extends DomainError {
  readonly from: string;
  readonly to: string;

  constructor(from: string, to: string) {
    super(
      "INVALID_STATUS_TRANSITION",
      "Nao foi possivel atualizar o status da doacao agora.",
      409,
    );
    this.name = "InvalidStatusTransitionError";
    this.from = from;
    this.to = to;
  }
}

export class DonationNotFoundError extends DomainError {
  constructor(id: string) {
    super("DONATION_NOT_FOUND", `Doacao ${id} nao encontrada.`, 404);
    this.name = "DonationNotFoundError";
  }
}
