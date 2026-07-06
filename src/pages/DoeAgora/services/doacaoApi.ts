import type { DoacaoData } from "../index";

interface CriarPreferenciaResponse {
  preferenceId: string;
  checkoutUrl: string;
  externalReference: string;
}

interface ApiErrorResponse {
  code?: string;
  message?: string;
  details?: Record<string, string>;
}

export class DonationApiError extends Error {
  code?: string;
  details?: Record<string, string>;

  constructor(
    message: string,
    code?: string,
    details?: Record<string, string>,
  ) {
    super(message);
    this.name = "DonationApiError";
    this.code = code;
    this.details = details;
  }
}

export async function criarPreferenciaDoacao(
  dados: DoacaoData,
): Promise<CriarPreferenciaResponse> {
  const response = await fetch(buildApiUrl("/api/doacoes/preferencia"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: getRequestCredentials(),
    body: JSON.stringify({
      valor: dados.valor,
      nome: dados.nome,
      email: dados.email,
      metodoPagamento: dados.metodoPagamento,
      aceitePrivacidade: dados.aceitePrivacidade,
    }),
  });
  const payload = (await response.json().catch(() => ({}))) as
    CriarPreferenciaResponse | ApiErrorResponse;

  if (!response.ok) {
    const errorPayload = payload as ApiErrorResponse;

    throw new DonationApiError(
      errorPayload.message ||
        "Não foi possível iniciar o pagamento. Tente novamente.",
      errorPayload.code,
      errorPayload.details,
    );
  }

  const successPayload = payload as CriarPreferenciaResponse;
  if (!successPayload.checkoutUrl) {
    throw new DonationApiError(
      "A resposta do pagamento veio incompleta. Tente novamente.",
      "CHECKOUT_URL_MISSING",
    );
  }

  return successPayload;
}

function buildApiUrl(path: string) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!baseUrl) {
    return path;
  }

  return `${baseUrl.replace(/\/$/, "")}${path}`;
}

function getRequestCredentials(): RequestCredentials {
  return import.meta.env.VITE_API_BASE_URL ? "omit" : "same-origin";
}
