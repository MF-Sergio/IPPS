import type { IncomingMessage, ServerResponse } from "node:http";
import type { PaymentNotificationInput } from "../../application/handle-payment-notification.usecase.ts";
import type { LoggerPort } from "../../domain/ports/logger.port.ts";
import type { RouterConfig } from "../router-config.ts";
import { HttpError, readJsonBody, sendJson } from "../http-context.ts";
import { assertWebhookAuthentic } from "../middleware/webhook-auth.ts";

export type NotificationExecutor = (input: PaymentNotificationInput) => Promise<void>;

export interface NotificationControllerDeps {
  config: RouterConfig;
  handleNotification: NotificationExecutor;
  logger: LoggerPort;
  enforceRateLimit: (req: IncomingMessage) => void;
}

// A Cielo usa GUID de 36 caracteres para PaymentId; o corpo do POST nao e
// autenticado, entao um PaymentId fora desse formato pode ser qualquer coisa
// - inclusive `../../../evil` ou uma query string - a caminho da URL que o
// gateway monta para reconsultar a Cielo.
const PAYMENT_ID_PATTERN = /^[A-Za-z0-9-]{1,36}$/;

function respondReceived(res: ServerResponse): void {
  // A Cielo reenfileira qualquer resposta diferente de 200 e reenvia a cada
  // 30 minutos. Uma notificacao autentica (ou rejeitada por um motivo nosso,
  // nao dela) sempre recebe 200, mesmo quando nao ha nada a atualizar.
  sendJson(res, 200, { received: true }, { "Cache-Control": "no-store" });
}

export function createPaymentNotificationController(deps: NotificationControllerDeps) {
  return {
    async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
      try {
        deps.enforceRateLimit(req);
      } catch (error) {
        if (error instanceof HttpError && error.code === "RATE_LIMITED") {
          deps.logger.warn("Notificacao com rate limit excedido, respondendo 200 para nao reenfileirar", {});
          respondReceived(res);
          return;
        }
        throw error;
      }

      assertWebhookAuthentic(req, deps.config);

      const body = await readJsonBody(req, deps.config.maxBodyBytes);

      const paymentId = String(body["PaymentId"] ?? "");
      if (!PAYMENT_ID_PATTERN.test(paymentId)) {
        deps.logger.warn("Notificacao com PaymentId fora do formato esperado, ignorada", {
          paymentId,
        });
        respondReceived(res);
        return;
      }

      await deps.handleNotification({
        paymentId,
        changeType: Number(body["ChangeType"]),
      });

      respondReceived(res);
    },
  };
}
