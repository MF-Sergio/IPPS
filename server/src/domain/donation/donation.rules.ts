import type { Address } from "../shared/address.ts";
import type { CardCredentials } from "../shared/card-credentials.ts";
import type { Money } from "../shared/money.ts";
import type { PaymentMethod } from "./donation-status.ts";
import { ValidationError } from "./donation.errors.ts";

export interface DonationLimits {
  min: Money;
  max: Money;
}

export interface DonationRulesInput {
  amount: Money;
  method: PaymentMethod;
  privacyAccepted: boolean;
  card: CardCredentials | null;
  address: Address | null;
  limits: DonationLimits;
}

export function assertDonationIsValid(input: DonationRulesInput): void {
  const details: Record<string, string> = {};

  if (input.amount.isLessThan(input.limits.min) || input.amount.isGreaterThan(input.limits.max)) {
    details["valor"] =
      `O valor deve ficar entre R$ ${input.limits.min.reais} e R$ ${input.limits.max.reais}.`;
  }

  if (!input.privacyAccepted) {
    details["aceitePrivacidade"] = "Aceite a Politica de Privacidade.";
  }

  if (input.method === "cartao" && input.card === null) {
    details["cartao"] = "Informe os dados do cartao.";
  }

  if (input.method === "boleto" && input.address === null) {
    details["endereco"] = "Informe o endereco completo para emitir o boleto.";
  }

  if (Object.keys(details).length > 0) {
    throw new ValidationError("Revise os dados enviados.", details);
  }
}
