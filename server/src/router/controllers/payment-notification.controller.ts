import type { IncomingMessage, ServerResponse } from "node:http";
import type { PaymentNotificationInput } from "../../application/handle-payment-notification.usecase.ts";
import type { AppConfig } from "../../infrastructure/config/app.config.ts";
import { readJsonBody, sendJson } from "../http-context.ts";
import { assertWebhookAuthentic } from "../middleware/webhook-auth.ts";

export type NotificationExecutor = (input: PaymentNotificationInput) => Promise<void>;

export interface NotificationControllerDeps {
  config: AppConfig;
  handleNotification: NotificationExecutor;
}

export function createPaymentNotificationController(deps: NotificationControllerDeps) {
  return {
    async handle(req: IncomingMessage, res: ServerResponse): Promise<void> {
      assertWebhookAuthentic(req, deps.config);

      const body = await readJsonBody(req, deps.config.maxBodyBytes);

      await deps.handleNotification({
        paymentId: String(body["PaymentId"] ?? ""),
        changeType: Number(body["ChangeType"]),
      });

      // A Cielo reenfileira qualquer resposta diferente de 200 e reenvia a cada
      // 30 minutos. Uma notificacao autentica sempre recebe 200, mesmo quando
      // nao ha nada a atualizar.
      sendJson(res, 200, { received: true }, { "Cache-Control": "no-store" });
    },
  };
}
