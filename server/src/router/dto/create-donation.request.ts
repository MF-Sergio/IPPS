import type { CreateDonationInput } from "../../application/create-donation.usecase.ts";
import { isPaymentMethod } from "../../domain/donation/donation-status.ts";
import { ValidationError } from "../../domain/donation/donation.errors.ts";

function readObject(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/**
 * Le apenas os campos do contrato publico. Qualquer outra coisa no corpo e
 * descartada aqui — o caso de uso nunca ve chave que o cliente inventou.
 */
export function parseCreateDonationRequest(body: unknown): CreateDonationInput {
  const payload = readObject(body);
  if (!payload) {
    throw new ValidationError("Corpo da requisicao invalido.", {
      body: "Envie um objeto JSON.",
    });
  }

  const method = payload["metodoPagamento"];
  if (!isPaymentMethod(method)) {
    throw new ValidationError("Revise os dados enviados.", {
      metodoPagamento: "Metodo de pagamento invalido.",
    });
  }

  const rawCard = readObject(payload["cartao"]);
  const rawAddress = readObject(payload["endereco"]);

  return {
    valor: Number(payload["valor"]),
    nome: readString(payload["nome"]),
    email: readString(payload["email"]),
    cpf: readString(payload["cpf"]),
    metodoPagamento: method,
    aceitePrivacidade: payload["aceitePrivacidade"] === true,
    cartao: rawCard
      ? {
          numero: readString(rawCard["numero"]),
          titular: readString(rawCard["titular"]),
          validade: readString(rawCard["validade"]),
          cvv: readString(rawCard["cvv"]),
          bandeira: readString(rawCard["bandeira"]),
        }
      : null,
    endereco: rawAddress
      ? {
          logradouro: readString(rawAddress["logradouro"]),
          numero: readString(rawAddress["numero"]),
          complemento: readString(rawAddress["complemento"]),
          bairro: readString(rawAddress["bairro"]),
          cidade: readString(rawAddress["cidade"]),
          uf: readString(rawAddress["uf"]),
          cep: readString(rawAddress["cep"]),
        }
      : null,
  };
}
