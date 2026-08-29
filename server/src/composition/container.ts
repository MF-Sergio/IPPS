import { createDonationUseCase } from "../application/create-donation.usecase.ts";
import { getDonationStatusUseCase } from "../application/get-donation-status.usecase.ts";
import { handlePaymentNotificationUseCase } from "../application/handle-payment-notification.usecase.ts";
import type { LoggerPort } from "../domain/ports/logger.port.ts";
import { createCieloClient } from "../infrastructure/cielo/cielo.client.ts";
import { createCieloGateway } from "../infrastructure/cielo/cielo-payment.gateway.ts";
import { buildAppConfig } from "../infrastructure/config/app.config.ts";
import type { AppConfig } from "../infrastructure/config/app.config.ts";
import { createConsoleLogger } from "../infrastructure/logging/console.logger.ts";
import { InMemoryDonationRepository } from "../infrastructure/persistence/in-memory-donation.repository.ts";
import { SystemClock } from "../infrastructure/system.clock.ts";
import { createDonationsController } from "../router/controllers/donations.controller.ts";
import { createHealthController } from "../router/controllers/health.controller.ts";
import { createPaymentNotificationController } from "../router/controllers/payment-notification.controller.ts";
import { createRateLimiter } from "../router/middleware/rate-limit.ts";

export interface Container {
  config: AppConfig;
  logger: LoggerPort;
  health: ReturnType<typeof createHealthController>;
  donations: ReturnType<typeof createDonationsController>;
  notification: ReturnType<typeof createPaymentNotificationController>;
}

/**
 * Unico arquivo que importa de todas as camadas. A regra de dependencia e
 * quebrada aqui de proposito, num lugar so e visivel — e por isso que o teste
 * de fronteira nao inspeciona `composition/`.
 */
export function buildContainer(
  env: Record<string, string | undefined> = process.env,
  fetchImpl: typeof fetch = fetch,
): Container {
  const config = buildAppConfig(env);
  const logger = createConsoleLogger();
  const clock = new SystemClock();
  const repository = new InMemoryDonationRepository();

  const client = createCieloClient(config.cielo, fetchImpl, logger);
  const gateway = createCieloGateway({ config: config.cielo, client, logger });

  const createDonation = createDonationUseCase({
    gateway, repository, clock, logger,
    limits: config.donationLimits,
    privacyTermsVersion: config.privacyTermsVersion,
  });
  const getDonationStatus = getDonationStatusUseCase({ gateway, repository, clock, logger });
  const handleNotification = handlePaymentNotificationUseCase({
    gateway, repository, clock, logger,
  });

  return {
    config,
    logger,
    health: createHealthController(),
    donations: createDonationsController({
      config,
      createDonation,
      getDonationStatus,
      enforceRateLimit: createRateLimiter(config),
    }),
    notification: createPaymentNotificationController({ config, handleNotification }),
  };
}
