import { Donation } from "../domain/donation/donation.entity.ts";
import type { Donor } from "../domain/donation/donation.entity.ts";
import type { PaymentMethod } from "../domain/donation/donation-status.ts";
import { ValidationError } from "../domain/donation/donation.errors.ts";
import { assertDonationIsValid } from "../domain/donation/donation.rules.ts";
import type { DonationLimits } from "../domain/donation/donation.rules.ts";
import type { ClockPort } from "../domain/ports/clock.port.ts";
import type { LoggerPort } from "../domain/ports/logger.port.ts";
import type { DonationRepositoryPort } from "../domain/ports/donation-repository.port.ts";
import type { PaymentGatewayPort, PaymentResult } from "../domain/ports/payment-gateway.port.ts";
import { Address } from "../domain/shared/address.ts";
import type { AddressInput } from "../domain/shared/address.ts";
import { asDonationId } from "../domain/shared/branded.ts";
import { CardCredentials } from "../domain/shared/card-credentials.ts";
import type { CardInput } from "../domain/shared/card-credentials.ts";
import { Cpf } from "../domain/shared/cpf.ts";
import { Email } from "../domain/shared/email.ts";
import { Money } from "../domain/shared/money.ts";
import { GatewayError } from "./application.errors.ts";

const PIX_EXPIRATION_MS = 2 * 60 * 60 * 1000;

export interface CreateDonationDeps {
  gateway: PaymentGatewayPort;
  repository: DonationRepositoryPort;
  clock: ClockPort;
  logger: LoggerPort;
  limits: DonationLimits;
  privacyTermsVersion: string;
}

export interface CreateDonationInput {
  valor: number;
  nome: string;
  email: string;
  cpf: string;
  metodoPagamento: PaymentMethod;
  aceitePrivacidade: boolean;
  cartao: CardInput | null;
  endereco: AddressInput | null;
}

export interface CreateDonationOutput {
  donation: Donation;
  payment: PaymentResult;
}

/**
 * Converte as excecoes dos objetos de valor num unico ValidationError com
 * `details` por campo, para o doador ver todos os problemas de uma vez.
 */
function parseInput(input: CreateDonationInput) {
  const details: Record<string, string> = {};

  let amount: Money | null = null;
  let email: Email | null = null;
  let cpf: Cpf | null = null;
  let card: CardCredentials | null = null;
  let address: Address | null = null;

  try {
    amount = Money.fromReais(input.valor);
  } catch (error) {
    details["valor"] = error instanceof Error ? error.message : "Valor invalido.";
  }

  try {
    email = Email.parse(input.email);
  } catch (error) {
    details["email"] = error instanceof Error ? error.message : "E-mail invalido.";
  }

  try {
    cpf = Cpf.parse(input.cpf);
  } catch (error) {
    details["cpf"] = error instanceof Error ? error.message : "CPF invalido.";
  }

  const name = String(input.nome ?? "").replace(/\s+/g, " ").trim().slice(0, 120);
  if (name.length < 3) {
    details["nome"] = "Informe o nome completo.";
  }

  if (input.cartao) {
    try {
      card = CardCredentials.parse(input.cartao);
    } catch (error) {
      details["cartao"] = error instanceof Error ? error.message : "Cartao invalido.";
    }
  }

  if (input.endereco) {
    try {
      address = Address.parse(input.endereco);
    } catch (error) {
      details["endereco"] = error instanceof Error ? error.message : "Endereco invalido.";
    }
  }

  if (Object.keys(details).length > 0) {
    throw new ValidationError("Revise os dados enviados.", details);
  }

  return { amount: amount!, email: email!, cpf: cpf!, name, card, address };
}

export function createDonationUseCase(deps: CreateDonationDeps) {
  return async function execute(input: CreateDonationInput): Promise<CreateDonationOutput> {
    const parsed = parseInput(input);

    assertDonationIsValid({
      amount: parsed.amount,
      method: input.metodoPagamento,
      privacyAccepted: input.aceitePrivacidade === true,
      card: parsed.card,
      address: parsed.address,
      limits: deps.limits,
    });

    const donor: Donor = {
      name: parsed.name,
      email: parsed.email,
      cpf: parsed.cpf,
      address: parsed.address,
    };

    const now = deps.clock.now();
    const donation = Donation.create({
      id: asDonationId(deps.clock.newId()),
      amount: parsed.amount,
      donor,
      method: input.metodoPagamento,
      privacyTermsVersion: deps.privacyTermsVersion,
      now,
    });

    let payment: PaymentResult;
    try {
      payment = await deps.gateway.createPayment({
        donation,
        card: parsed.card,
        expiresAt: new Date(now.getTime() + PIX_EXPIRATION_MS),
      });
    } catch (error) {
      // A tentativa nao pode desaparecer: registra a falha antes de tentar
      // salvar, para que o diagnostico sobreviva mesmo se o proprio save
      // falhar (ex.: Postgres fora do ar). O chamador sempre ve GatewayError,
      // nunca o erro cru do repositorio.
      donation.transitionTo("falhou", deps.clock.now());
      deps.logger.error("Falha ao criar pagamento na Cielo", {
        donationId: donation.id,
        method: donation.method,
        reason: error instanceof Error ? error.message : "desconhecido",
      });
      try {
        await deps.repository.save(donation);
      } catch (saveError) {
        deps.logger.error("Falha ao salvar doacao apos falha no gateway", {
          donationId: donation.id,
          reason: saveError instanceof Error ? saveError.message : "desconhecido",
        });
      }
      throw new GatewayError();
    }

    donation.attachPayment(payment.paymentId, payment.status, deps.clock.now());
    await deps.repository.save(donation);

    deps.logger.info("Doacao criada", {
      donationId: donation.id,
      paymentId: payment.paymentId,
      method: donation.method,
      status: donation.status,
      amountCents: donation.amount.cents,
    });

    return { donation, payment };
  };
}
