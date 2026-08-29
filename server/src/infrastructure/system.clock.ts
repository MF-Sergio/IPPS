import crypto from "node:crypto";
import type { ClockPort } from "../domain/ports/clock.port.ts";

export class SystemClock implements ClockPort {
  now(): Date {
    return new Date();
  }

  /**
   * "IPPS" + 32 hex = 36 caracteres, todos alfanumericos.
   * Atende ao limite de 36 da consulta por merchantOrderId da Cielo, que nao
   * aceita hifen — motivo pelo qual o externalReference antigo era invalido.
   */
  newId(): string {
    return `IPPS${crypto.randomUUID().replace(/-/g, "")}`;
  }
}
