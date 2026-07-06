import { appConfig } from "../config/app.mjs";
import { httpError } from "../utils/http.mjs";
import { isValidEmail, sanitizeText } from "../utils/text.mjs";

export function validateDonationPayload(payload) {
  const errors = {};
  const valor = Number(payload?.valor);
  const nome = sanitizeText(payload?.nome, 120);
  const email = String(payload?.email || "")
    .trim()
    .toLowerCase();
  const metodoPagamento = payload?.metodoPagamento;
  const aceitePrivacidade = payload?.aceitePrivacidade === true;

  if (!Number.isFinite(valor)) {
    errors.valor = "Informe um valor numérico.";
  } else if (
    valor < appConfig.donationMinValue ||
    valor > appConfig.donationMaxValue
  ) {
    errors.valor = `O valor deve ficar entre R$ ${appConfig.donationMinValue} e R$ ${appConfig.donationMaxValue}.`;
  }

  if (nome.length < 3) {
    errors.nome = "Informe o nome completo.";
  }

  if (!isValidEmail(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!["pix", "cartao", "boleto"].includes(metodoPagamento)) {
    errors.metodoPagamento = "Método de pagamento inválido.";
  }

  if (!aceitePrivacidade) {
    errors.aceitePrivacidade = "Aceite a Política de Privacidade.";
  }

  if (Object.keys(errors).length > 0) {
    const error = httpError(
      400,
      "Revise os dados enviados.",
      "VALIDATION_ERROR",
    );
    error.details = errors;
    throw error;
  }

  return {
    valor: Math.round(valor * 100) / 100,
    nome,
    email,
    metodoPagamento,
  };
}
