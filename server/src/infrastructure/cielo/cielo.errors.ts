export class CieloHttpError extends Error {
  readonly code = "CIELO_HTTP_ERROR";
  readonly status: number;
  readonly cieloCode: string | null;

  constructor(status: number, message: string, cieloCode: string | null) {
    super(message);
    this.name = "CieloHttpError";
    this.status = status;
    this.cieloCode = cieloCode;
  }
}

/**
 * Erro da Cielo vem em dois formatos: array de `{ Code, Message }` (validacao)
 * ou objeto com `Message`. Esta funcao normaliza os dois.
 */
export function describeCieloError(payload: unknown): { message: string; code: string | null } {
  if (Array.isArray(payload) && payload.length > 0) {
    const first = payload[0] as Record<string, unknown>;
    return {
      message: String(first["Message"] ?? "Erro sem mensagem"),
      code: first["Code"] !== undefined ? String(first["Code"]) : null,
    };
  }

  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;
    return {
      message: String(record["Message"] ?? record["message"] ?? "Erro sem mensagem"),
      code: record["Code"] !== undefined ? String(record["Code"]) : null,
    };
  }

  return { message: "Resposta sem corpo", code: null };
}
