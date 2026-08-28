export type LogMeta = Record<string, unknown>;

export interface LoggerPort {
  info(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  error(message: string, meta?: LogMeta): void;
}
