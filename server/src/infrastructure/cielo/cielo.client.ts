import crypto from "node:crypto";
import type { LoggerPort } from "../../domain/ports/logger.port.ts";
import type { CieloConfig } from "../config/app.config.ts";
import { CieloHttpError, describeCieloError } from "./cielo.errors.ts";

export type FetchLike = typeof fetch;

export interface CieloClient {
  post<T>(baseUrl: string, path: string, body: unknown): Promise<T>;
  get<T>(baseUrl: string, path: string): Promise<T>;
  put<T>(baseUrl: string, path: string, body?: unknown): Promise<T>;
}

export function createCieloClient(
  config: CieloConfig,
  fetchImpl: FetchLike,
  logger: LoggerPort,
): CieloClient {
  async function request<T>(
    method: "GET" | "POST" | "PUT",
    baseUrl: string,
    path: string,
    body?: unknown,
  ): Promise<T> {
    const requestId = crypto.randomUUID();
    const url = `${baseUrl}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

    // `clearTimeout` so roda no finally deste bloco, depois que o corpo
    // termina de ser lido — senao o timeout deixa de valer justamente para a
    // parte que pode ficar pendurada (leitura de corpo com a conexao
    // degradada no meio do stream).
    try {
      let response: Response;
      try {
        response = await fetchImpl(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            MerchantId: config.merchantId,
            MerchantKey: config.merchantKey,
            RequestId: requestId,
          },
          ...(body === undefined ? {} : { body: JSON.stringify(body) }),
          signal: controller.signal,
        });
      } catch (error) {
        logger.error("Falha de rede ao chamar a Cielo", {
          requestId, method, path,
          reason: error instanceof Error ? error.message : "desconhecido",
        });
        throw new CieloHttpError(0, "Gateway de pagamento indisponivel.", null);
      }

      let text: string;
      try {
        text = await response.text();
      } catch (error) {
        // Falha de rede no meio do corpo nao pode escapar como TypeError cru:
        // o error-handler so reconhece CIELO_HTTP_ERROR/CIELO_INVALID_RESPONSE
        // e devolveria 500 em vez do 502 que o contrato do client promete.
        logger.error("Falha ao ler a resposta da Cielo", {
          requestId, method, path,
          reason: error instanceof Error ? error.message : "desconhecido",
        });
        throw new CieloHttpError(0, "Gateway de pagamento indisponivel.", null);
      }

      let payload: unknown = undefined;
      try {
        payload = text ? JSON.parse(text) : undefined;
      } catch {
        payload = undefined;
      }

      if (!response.ok) {
        const described = describeCieloError(payload);
        // O `meta` passa pelo redact do logger, entao MerchantKey nunca sai daqui.
        logger.error("Cielo respondeu com erro", {
          requestId, method, path,
          status: response.status,
          cieloCode: described.code,
          cieloMessage: described.message,
        });
        throw new CieloHttpError(response.status, described.message, described.code);
      }

      return payload as T;
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    post: (baseUrl, path, body) => request("POST", baseUrl, path, body),
    get: (baseUrl, path) => request("GET", baseUrl, path),
    put: (baseUrl, path, body) => request("PUT", baseUrl, path, body),
  };
}
