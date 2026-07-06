import { appConfig } from "../../config/app.mjs";

export function buildBackUrls() {
  return {
    success: buildReturnUrl("sucesso"),
    failure: buildReturnUrl("falha"),
    pending: buildReturnUrl("pendente"),
  };
}

export function buildNotificationUrl() {
  if (process.env.MERCADO_PAGO_NOTIFICATION_URL) {
    return process.env.MERCADO_PAGO_NOTIFICATION_URL;
  }

  const baseUrl = new URL(appConfig.appBaseUrl);
  const isLocal =
    baseUrl.hostname === "localhost" || baseUrl.hostname === "127.0.0.1";

  if (baseUrl.protocol !== "https:" || isLocal) {
    return undefined;
  }

  return new URL("/api/mercado-pago/webhook", appConfig.appBaseUrl).toString();
}

function buildReturnUrl(status) {
  const url = new URL("/doe-agora", appConfig.appBaseUrl);
  url.searchParams.set("doacao", status);
  return url.toString();
}
