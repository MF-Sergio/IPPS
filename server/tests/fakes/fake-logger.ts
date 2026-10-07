import type { LoggerPort, LogMeta } from "../../src/domain/ports/logger.port.ts";

export interface LogEntry {
  level: "info" | "warn" | "error";
  message: string;
  meta: LogMeta | undefined;
}

export class FakeLogger implements LoggerPort {
  readonly entries: LogEntry[] = [];

  info(message: string, meta?: LogMeta): void {
    this.entries.push({ level: "info", message, meta });
  }

  warn(message: string, meta?: LogMeta): void {
    this.entries.push({ level: "warn", message, meta });
  }

  error(message: string, meta?: LogMeta): void {
    this.entries.push({ level: "error", message, meta });
  }
}
