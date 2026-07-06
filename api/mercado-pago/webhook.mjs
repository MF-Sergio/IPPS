import { handleMercadoPagoWebhook } from "../../server/api/mercadoPagoWebhook.controller.mjs";
import { withVercelApi } from "../../server/vercel/withVercelApi.mjs";

export default withVercelApi(async (req, res) => {
  const requestUrl = new URL(req.url || "/", getRequestBaseUrl(req));
  await handleMercadoPagoWebhook(req, res, requestUrl);
});

function getRequestBaseUrl(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host || "localhost";
  return `${protocol}://${host}`;
}
