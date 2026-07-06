import { validateMercadoPagoWebhookSignature } from "../services/mercadoPago.service.mjs";
import { httpError, sendJson } from "../utils/http.mjs";
import { readJsonBody } from "../utils/request.mjs";

export async function handleMercadoPagoWebhook(req, res, requestUrl) {
  const payload = await readJsonBody(req);
  const dataId = requestUrl.searchParams.get("data.id") || payload?.data?.id;

  if (!validateMercadoPagoWebhookSignature(req, dataId)) {
    throw httpError(401, "Assinatura inválida.", "WEBHOOK_SIGNATURE_INVALID");
  }

  console.log("Webhook Mercado Pago recebido", {
    type: typeof payload?.type === "string" ? payload.type : "unknown",
    action: typeof payload?.action === "string" ? payload.action : "unknown",
    dataId: typeof dataId === "string" ? dataId : "unknown",
  });

  sendJson(res, 200, { received: true }, { "Cache-Control": "no-store" });
}
