import type { LogMeta } from "../../domain/ports/logger.port.ts";

const SENSITIVE = new Set([
  "cardnumber", "numero", "securitycode", "cvv", "cardtoken",
  "merchantkey", "merchantid", "identity", "cpf", "authorization",
  "notificationheadervalue", "notificationheadername",
]);

const MASK = "[REDACTED]";

function redactValue(value: unknown, seen: WeakSet<object>): unknown {
  if (value === null || typeof value !== "object") return value;
  if (seen.has(value)) return "[CIRCULAR]";
  seen.add(value);

  if (Array.isArray(value)) {
    return value.map((item) => redactValue(item, seen));
  }

  // Objetos que ja sabem se mascarar (ex.: CardCredentials) tem prioridade.
  const candidate = value as { toJSON?: () => unknown };
  if (typeof candidate.toJSON === "function") {
    return redactValue(candidate.toJSON(), seen);
  }

  const output: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value)) {
    output[key] = SENSITIVE.has(key.toLowerCase()) ? MASK : redactValue(item, seen);
  }
  return output;
}

export function redact(meta: LogMeta): LogMeta {
  return redactValue(meta, new WeakSet()) as LogMeta;
}
