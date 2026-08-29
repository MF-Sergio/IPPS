import type { ServerResponse } from "node:http";
import { DomainError, ValidationError } from "../domain/donation/donation.errors.ts";
import type { LoggerPort } from "../domain/ports/logger.port.ts";
import { HttpError, sendJson } from "./http-context.ts";

export { HttpError } from "./http-context.ts";

interface Normalized {
  status: number;
  code: string;
  message: string;
  details: Record<string, string> | undefined;
}

/**
 * Unico ponto do sistema que transforma erro em codigo HTTP.
 * O dominio expressa gravidade por `statusHint`; a traducao acontece aqui.
 */
function normalize(error: unknown): Normalized {
  if (error instanceof HttpError) {
    return {
      status: error.statusCode,
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof ValidationError) {
    return {
      status: error.statusHint,
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }

  if (error instanceof DomainError) {
    return {
      status: error.statusHint,
      code: error.code,
      message: error.message,
      details: undefined,
    };
  }

  // Erros de infraestrutura (incluindo CieloHttpError) nunca vazam a mensagem
  // original: o texto da Cielo e para o log, nao para o doador.
  const code = (error as { code?: unknown })?.code;
  if (code === "CIELO_HTTP_ERROR" || code === "CIELO_INVALID_RESPONSE") {
    return {
      status: 502,
      code: "PAYMENT_GATEWAY_ERROR",
      message: "Nao foi possivel processar o pagamento agora. Tente novamente.",
      details: undefined,
    };
  }

  return {
    status: 500,
    code: "INTERNAL_ERROR",
    message: "Nao foi possivel processar sua solicitacao agora.",
    details: undefined,
  };
}

export function handleError(res: ServerResponse, error: unknown, logger: LoggerPort): void {
  const normalized = normalize(error);

  if (normalized.status >= 500) {
    logger.error("Erro na API", {
      code: normalized.code,
      status: normalized.status,
      reason: error instanceof Error ? error.message : "desconhecido",
    });
  }

  sendJson(
    res,
    normalized.status,
    {
      error: true,
      code: normalized.code,
      message: normalized.message,
      ...(normalized.details ? { details: normalized.details } : {}),
    },
    { "Cache-Control": "no-store" },
  );
}
