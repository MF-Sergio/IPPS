import crypto from "node:crypto";
import type { IncomingMessage } from "node:http";
import type { RouterConfig } from "../router-config.ts";
import { HttpError } from "../http-context.ts";

/**
 * O Post de Notificacao da Cielo nao tem assinatura criptografica. A unica
 * protecao oferecida e um header estatico cadastrado no Suporte Cielo.
 * Por isso o corpo do POST nunca e fonte de verdade: o caso de uso reconsulta
 * a Cielo antes de mudar qualquer status.
 */
export function assertWebhookAuthentic(req: IncomingMessage, config: RouterConfig): void {
  const name = config.cielo.notificationHeaderName;
  const expected = config.cielo.notificationHeaderValue;

  if (!name || !expected) return;

  const received = String(req.headers[name.toLowerCase()] ?? "");
  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(received, "utf8");

  const matches =
    expectedBuffer.length === receivedBuffer.length &&
    crypto.timingSafeEqual(expectedBuffer, receivedBuffer);

  if (!matches) {
    throw new HttpError(401, "Notificacao nao autenticada.", "WEBHOOK_UNAUTHENTICATED");
  }
}
