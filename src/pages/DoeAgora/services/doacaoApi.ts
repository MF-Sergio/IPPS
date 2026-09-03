import type { DoacaoData, DoacaoResposta } from "../index";

interface ApiErrorResponse {
  code?: string;
  message?: string;
  details?: Record<string, string>;
}

export class DonationApiError extends Error {
  code: string | undefined;
  details?: Record<string, string>;

  constructor(
    message: string,
    code?: string,
    details?: Record<string, string>,
  ) {
    super(message);
    this.name = "DonationApiError";
    this.code = code;
    if (details !== undefined) {
      this.details = details;
    }
  }
}

// Aguardando as credenciais Cielo para validar este contrato contra o sandbox;
// a rota e o formato abaixo ja correspondem ao backend implementado no projeto.
export async function criarDoacao(
  dados: DoacaoData,
): Promise<DoacaoResposta> {
  const response = await fetch(buildApiUrl("/api/doacoes"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: getRequestCredentials(),
    body: JSON.stringify({
      valor: dados.valor,
      nome: dados.nome,
      email: dados.email,
      cpf: dados.cpf,
      metodoPagamento: dados.metodoPagamento,
      aceitePrivacidade: dados.aceitePrivacidade,
      cartao:
        dados.metodoPagamento === "cartao"
          ? {
              // CIELO: substituir dados sensíveis pelo token do SDK quando o
              // contrato de tokenização e o ambiente de produção forem definidos.
              numero: dados.cartao.numero,
              titular: dados.cartao.titular,
              validade: dados.cartao.validade,
              cvv: dados.cartao.cvv,
              bandeira: dados.cartao.bandeira,
            }
          : null,
      endereco:
        dados.metodoPagamento === "boleto"
          ? {
              // CIELO: confirmar o mapeamento do endereço para Customer.Address
              // e quais campos o emissor do boleto realmente exige.
              logradouro: dados.endereco.logradouro,
              numero: dados.endereco.numero,
              complemento: dados.endereco.complemento,
              bairro: dados.endereco.bairro,
              cidade: dados.endereco.cidade,
              uf: dados.endereco.uf,
              cep: dados.endereco.cep,
            }
          : null,
    }),
  });
  const payload = (await response.json().catch(() => ({}))) as
    DoacaoResposta | ApiErrorResponse;

  if (!response.ok) {
    const errorPayload = payload as ApiErrorResponse;

    throw new DonationApiError(
      errorPayload.message ||
        "Não foi possível iniciar o pagamento. Tente novamente.",
      errorPayload.code,
      errorPayload.details,
    );
  }

  const successPayload = payload as DoacaoResposta;

  if (successPayload.metodoPagamento === "pix") {
    if (
      !successPayload.id ||
      !successPayload.pix?.qrCodeBase64 ||
      !successPayload.pix.qrCodeString
    ) {
      throw new DonationApiError(
        "A resposta do Pix veio incompleta. Tente novamente.",
        "PIX_RESPONSE_INCOMPLETE",
      );
    }

    return successPayload;
  }

  if (successPayload.metodoPagamento === "boleto") {
    // CIELO: validar os nomes definitivos dos campos de URL, linha digitável,
    // código de barras e vencimento no retorno do emissor contratado.
    if (
      !successPayload.id ||
      !successPayload.boleto?.url ||
      !successPayload.boleto?.linhaDigitavel
    ) {
      throw new DonationApiError(
        "A resposta do boleto veio incompleta. Tente novamente.",
        "BOLETO_RESPONSE_INCOMPLETE",
      );
    }

    return successPayload;
  }

  if (successPayload.metodoPagamento === "cartao") {
    // CIELO: confirmar quais dados podem retornar no response e se o status
    // representa autorizado, capturado, pendente ou recusado.
    if (!successPayload.id || !successPayload.cartao?.bandeira) {
      throw new DonationApiError(
        "A resposta do cartão veio incompleta. Tente novamente.",
        "CARD_RESPONSE_INCOMPLETE",
      );
    }

    return successPayload;
  }

  if (!successPayload.id) {
    throw new DonationApiError(
      "A resposta do pagamento veio incompleta. Tente novamente.",
      "PAYMENT_RESPONSE_INCOMPLETE",
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
