import type { IncomingMessage } from "node:http";
import type { AppConfig } from "../../infrastructure/config/app.config.ts";
import { getClientIp, HttpError } from "../http-context.ts";

interface Record_ {
  windowStart: number;
  count: number;
}

/**
 * Contador em memoria. Em Vercel Functions cada instancia tem o seu, entao o
 * teto efetivo e por instancia, nao global — divida tecnica registrada na spec
 * (§14, risco 2). A correcao real e rate limit no edge ou em store compartilhado.
 */
export function createRateLimiter(config: AppConfig) {
  const store = new Map<string, Record_>();

  return function enforceRateLimit(req: IncomingMessage): void {
    const now = Date.now();
    const ip = getClientIp(req);
    const record = store.get(ip);

    if (!record || now - record.windowStart > config.rateLimitWindowMs) {
      store.set(ip, { windowStart: now, count: 1 });

      // Limpeza oportunista: evita timer, que nao sobrevive em serverless.
      if (store.size > 5000) {
        for (const [key, value] of store) {
          if (now - value.windowStart > config.rateLimitWindowMs) store.delete(key);
        }
      }
      return;
    }

    record.count += 1;
    if (record.count > config.rateLimitMax) {
      throw new HttpError(429, "Muitas tentativas. Aguarde alguns minutos.", "RATE_LIMITED");
    }
  };
}
