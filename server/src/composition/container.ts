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
import type { AppHandlers } from "../router/app-handlers.ts";
import { createDonationsController } from "../router/controllers/donations.controller.ts";
import { createHealthController } from "../router/controllers/health.controller.ts";
import { createPaymentNotificationController } from "../router/controllers/payment-notification.controller.ts";
import { createRateLimiter } from "../router/middleware/rate-limit.ts";

export interface Container extends AppHandlers {
  // `AppConfig` e um superconjunto estrutural de `RouterConfig` (o tipo que
  // `AppHandlers.config` declara) — narrowing aqui e seguro e da ao resto do
  // composition root acesso aos campos que o router nao precisa ver
  // (credenciais da Cielo, limites de doacao etc.).
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

  if (
    env["NODE_ENV"] === "production" &&
    (!config.cielo.notificationHeaderName || !config.cielo.notificationHeaderValue)
  ) {
    // Sem o par de header, `assertWebhookAuthentic` e fail-open: qualquer
    // origem pode POSTar em /api/cielo/notificacao. Isso e esperado ate o
    // cadastro manual no Suporte Cielo ser concluido, entao nao pode ser
    // erro fatal de boot — mas precisa ser bem visivel no log de producao.
    logger.warn(
      "ALERTA: webhook da Cielo sem header de autenticacao configurado " +
        "(CIELO_NOTIFICATION_HEADER_NAME/CIELO_NOTIFICATION_HEADER_VALUE) — " +
        "qualquer origem pode POSTar em /api/cielo/notificacao.",
      {},
    );
  }

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
    notification: createPaymentNotificationController({
      config,
      handleNotification,
      logger,
      // Limitador proprio: trafego do webhook (vindo dos servidores da
      // Cielo) nao deve consumir o mesmo teto usado por navegadores em
      // /api/doacoes e /api/doacoes/:id/status.
      enforceRateLimit: createRateLimiter(config),
    }),
  };
}
