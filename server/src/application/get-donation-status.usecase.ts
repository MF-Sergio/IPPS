import type { DonationStatus } from "../domain/donation/donation-status.ts";
import { isTerminal } from "../domain/donation/donation-status.ts";
import { DonationNotFoundError } from "../domain/donation/donation.errors.ts";
import type { ClockPort } from "../domain/ports/clock.port.ts";
import type { DonationRepositoryPort } from "../domain/ports/donation-repository.port.ts";
import type { LoggerPort } from "../domain/ports/logger.port.ts";
import type { PaymentGatewayPort } from "../domain/ports/payment-gateway.port.ts";

const PIX_EXPIRATION_MS = 2 * 60 * 60 * 1000;

export interface GetDonationStatusDeps {
  gateway: PaymentGatewayPort;
  repository: DonationRepositoryPort;
  clock: ClockPort;
  logger: LoggerPort;
}

export interface DonationStatusView {
  id: string;
  status: DonationStatus;
  updatedAt: Date;
}

export function getDonationStatusUseCase(deps: GetDonationStatusDeps) {
  return async function execute(id: string): Promise<DonationStatusView> {
    const donation = await deps.repository.findById(id);

    if (donation) {
      const now = deps.clock.now();

      // 1. Pix vencido: derivado por nos, sem custo de rede.
      const pixExpired =
        donation.method === "pix" &&
        donation.status === "pendente" &&
        now.getTime() > donation.createdAt.getTime() + PIX_EXPIRATION_MS;

      if (pixExpired) {
        donation.transitionTo("expirada", now);
        await deps.repository.save(donation);
        return { id: donation.id, status: donation.status, updatedAt: donation.updatedAt };
      }

      // 2. Ja e terminal: nada na Cielo pode mudar isso.
      if (isTerminal(donation.status)) {
        return { id: donation.id, status: donation.status, updatedAt: donation.updatedAt };
      }

      // 3. Nao terminal: a Cielo e a fonte de verdade.
      if (donation.paymentId) {
        const snapshot = await deps.gateway.getPaymentById(donation.paymentId);
        donation.transitionTo(snapshot.status, deps.clock.now());
        await deps.repository.save(donation);
        return { id: donation.id, status: donation.status, updatedAt: donation.updatedAt };
      }
    }

    // Repositorio nao tem o registro — instancia serverless nova, provavelmente.
    // O id da doacao foi enviado como MerchantOrderId, entao a Cielo sabe responder.
    const snapshot = await deps.gateway.findPaymentByOrderId(id);

    if (!snapshot) {
      throw new DonationNotFoundError(id);
    }

    deps.logger.info("Status recuperado direto da Cielo", {
      donationId: id,
      paymentId: snapshot.paymentId,
      status: snapshot.status,
    });

    return { id, status: snapshot.status, updatedAt: deps.clock.now() };
  };
}
