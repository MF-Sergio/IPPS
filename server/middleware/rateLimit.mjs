import { appConfig } from "../config/app.mjs";
import { httpError } from "../utils/http.mjs";
import { getClientIp } from "../utils/network.mjs";

const rateLimitStore = new Map();

export function enforceRateLimit(req) {
  const now = Date.now();
  const ip = getClientIp(req);
  const record = rateLimitStore.get(ip);

  if (!record || now - record.windowStart > appConfig.rateLimitWindowMs) {
    rateLimitStore.set(ip, { windowStart: now, count: 1 });
    return;
  }

  record.count += 1;

  if (record.count > appConfig.rateLimitMax) {
    throw httpError(
      429,
      "Muitas tentativas. Aguarde alguns minutos.",
      "RATE_LIMITED",
    );
  }
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitStore.entries()) {
    if (now - record.windowStart > appConfig.rateLimitWindowMs) {
      rateLimitStore.delete(ip);
    }
  }
}, appConfig.rateLimitWindowMs).unref();
