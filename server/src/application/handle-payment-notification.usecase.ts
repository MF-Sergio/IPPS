import type { ClockPort } from "../domain/ports/clock.port.ts";
import type { DonationRepositoryPort } from "../domain/ports/donation-repository.port.ts";
import type { LoggerPort } from "../domain/ports/logger.port.ts";
import type { PaymentGatewayPort } from "../domain/ports/payment-gateway.port.ts";

/** Unico ChangeType que representa mudanca de status de pagamento. */
const CHANGE_TYPE_PAYMENT_STATUS = 1;

export interface HandlePaymentNotificationDeps {
  gateway: PaymentGatewayPort;
  repository: DonationRepositoryPort;
  clock: ClockPort;
  logger: LoggerPort;
}

export interface PaymentNotificationInput {
  paymentId: string;
  changeType: number;
}

export function handlePaymentNotificationUseCase(deps: HandlePaymentNotificationDeps) {
  return async function execute(input: PaymentNotificationInput): Promise<void> {
    if (input.changeType !== CHANGE_TYPE_PAYMENT_STATUS) {
      deps.logger.info("Notificacao ignorada: ChangeType nao tratado", {
        paymentId: input.paymentId,
        changeType: input.changeType,
      });
      return;
    }

    // O corpo do POST nao tem assinatura, entao nao e fonte de verdade.
    // O status real so vem de uma consulta nossa a Cielo.
    let snapshot;
    try {
      snapshot = await deps.gateway.getPaymentById(input.paymentId);
    } catch (error) {
      deps.logger.error("Falha ao consultar pagamento notificado", {
        paymentId: input.paymentId,
        reason: error instanceof Error ? error.message : "desconhecido",
      });
      return;
    }

    const donation =
      (await deps.repository.findByPaymentId(input.paymentId)) ??
      (await deps.repository.findById(snapshot.orderId));

    if (!donation) {
      // Esperado em serverless: a instancia que criou a doacao ja morreu.
      // Nao ha o que atualizar, mas o evento fica registrado.
      deps.logger.info("Notificacao sem doacao em memoria", {
        paymentId: snapshot.paymentId,
        donationId: snapshot.orderId,
        status: snapshot.status,
      });
      return;
    }

    try {
      donation.transitionTo(snapshot.status, deps.clock.now());
      await deps.repository.save(donation);
      deps.logger.info("Doacao atualizada por notificacao", {
        donationId: donation.id,
        paymentId: snapshot.paymentId,
        status: donation.status,
      });
    } catch (error) {
      // Notificacao fora de ordem: a Cielo reenvia a cada 30 min e pode chegar
      // atrasada. Nunca propagar — resposta diferente de 200 faz reenfileirar.
      deps.logger.warn("Notificacao com transicao invalida, ignorada", {
        donationId: donation.id,
        from: donation.status,
        to: snapshot.status,
        reason: error instanceof Error ? error.message : "desconhecido",
      });
    }
  };
}
