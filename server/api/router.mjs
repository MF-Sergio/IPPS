import { handleCreateDonationPreference } from "./donations.controller.mjs";
import { handleMercadoPagoWebhook } from "./mercadoPagoWebhook.controller.mjs";
import { serveStaticAsset } from "../static/serveStaticAsset.mjs";
import { httpError, sendJson } from "../utils/http.mjs";

export async function handleRequest(req, res, requestUrl) {
  if (requestUrl.pathname === "/api/health" && req.method === "GET") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (
    requestUrl.pathname === "/api/doacoes/preferencia" &&
    req.method === "POST"
  ) {
    await handleCreateDonationPreference(req, res);
    return;
  }

  if (
    requestUrl.pathname === "/api/mercado-pago/webhook" &&
    req.method === "POST"
  ) {
    await handleMercadoPagoWebhook(req, res, requestUrl);
    return;
  }

  if (requestUrl.pathname.startsWith("/api/")) {
    throw httpError(404, "Rota de API não encontrada.", "API_NOT_FOUND");
  }

  await serveStaticAsset(req, res, requestUrl);
}
