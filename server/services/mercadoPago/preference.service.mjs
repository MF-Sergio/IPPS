import crypto from "node:crypto";
import { appConfig } from "../../config/app.mjs";
import { httpError } from "../../utils/http.mjs";
import { parseJson } from "../../utils/json.mjs";
import {
  normalizeStatementDescriptor,
  paymentMethodLabel,
  splitName,
} from "../../utils/text.mjs";
import { getGatewayErrorMessage } from "./errors.mjs";
import { buildPaymentMethods } from "./paymentMethods.mjs";
import { buildBackUrls, buildNotificationUrl } from "./urls.mjs";

export async function createMercadoPagoPreference(donation) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw httpError(
      503,
      "Gateway de pagamento ainda não configurado.",
      "MERCADO_PAGO_TOKEN_MISSING",
    );
  }

  const externalReference = `ipps-${Date.now()}-${crypto.randomUUID()}`;
  const body = buildPreferencePayload(donation, externalReference);
  const response = await fetch(appConfig.mercadoPagoPreferencesUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify(body),
  });
  const rawResponse = await response.text();
  const mercadoPagoPayload = parseJson(rawResponse);

  if (!response.ok) {
    console.error("Erro ao criar preference no Mercado Pago", {
      status: response.status,
      externalReference,
      message: getGatewayErrorMessage(mercadoPagoPayload),
    });
    throw httpError(
      502,
      "Não foi possível iniciar o pagamento agora.",
      "MERCADO_PAGO_PREFERENCE_FAILED",
    );
  }

  const checkoutUrl =
    process.env.MERCADO_PAGO_ENVIRONMENT === "sandbox"
      ? mercadoPagoPayload?.sandbox_init_point || mercadoPagoPayload?.init_point
      : mercadoPagoPayload?.init_point ||
        mercadoPagoPayload?.sandbox_init_point;

  if (!mercadoPagoPayload?.id || !checkoutUrl) {
    throw httpError(
      502,
      "Resposta inesperada do gateway de pagamento.",
      "MERCADO_PAGO_INVALID_RESPONSE",
    );
  }

  return {
    preferenceId: mercadoPagoPayload.id,
    checkoutUrl,
    externalReference,
  };
}

function buildPreferencePayload(donation, externalReference) {
  const { firstName, lastName } = splitName(donation.nome);
  const body = {
    items: [
      {
        id: "doacao-ipps",
        title: "Doação IPPS",
        description: `Doação única via ${paymentMethodLabel(
          donation.metodoPagamento,
        )}`,
        quantity: 1,
        currency_id: "BRL",
        unit_price: donation.valor,
      },
    ],
    payer: {
      name: firstName,
      surname: lastName,
      email: donation.email,
    },
    payment_methods: buildPaymentMethods(donation.metodoPagamento),
    external_reference: externalReference,
    statement_descriptor: normalizeStatementDescriptor(
      process.env.MERCADO_PAGO_STATEMENT_DESCRIPTOR || "IPPS",
    ),
    metadata: {
      source: "doe_agora",
      donation_type: "one_time",
      selected_payment_method: donation.metodoPagamento,
      privacy_terms_version: appConfig.privacyTermsVersion,
    },
    back_urls: buildBackUrls(),
    auto_return: "approved",
  };

  const notificationUrl = buildNotificationUrl();
  if (notificationUrl) {
    body.notification_url = notificationUrl;
  }

  return body;
}
