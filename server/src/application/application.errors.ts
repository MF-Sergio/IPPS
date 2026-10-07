import { DomainError } from "../domain/donation/donation.errors.ts";

export class GatewayError extends DomainError {
  constructor(message = "Nao foi possivel iniciar o pagamento agora.") {
    super("PAYMENT_GATEWAY_ERROR", message, 502);
    this.name = "GatewayError";
  }
}

export class PaymentDeniedError extends DomainError {
  constructor(message = "Pagamento nao autorizado. Tente outro meio de pagamento.") {
    super("PAYMENT_DENIED", message, 402);
    this.name = "PaymentDeniedError";
  }
}
