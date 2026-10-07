import type { LoggerPort, LogMeta } from "../../domain/ports/logger.port.ts";
import { redact } from "./redact.ts";

function emit(level: "info" | "warn" | "error", message: string, meta?: LogMeta): void {
  const line = JSON.stringify({
    level,
    message,
    timestamp: new Date().toISOString(),
    ...(meta ? { meta: redact(meta) } : {}),
  });

  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export function createConsoleLogger(): LoggerPort {
  return {
    info: (message, meta) => emit("info", message, meta),
    warn: (message, meta) => emit("warn", message, meta),
    error: (message, meta) => emit("error", message, meta),
  };
}
