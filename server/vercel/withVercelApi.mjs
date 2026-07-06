import { appConfig } from "../config/app.mjs";
import { applyCors, isApiPreflight } from "../middleware/cors.mjs";
import { setBaseSecurityHeaders } from "../middleware/securityHeaders.mjs";
import { handleError } from "../utils/http.mjs";

export function withVercelApi(handler) {
  return async function vercelHandler(req, res) {
    const requestUrl = new URL(req.url || "/", getRequestBaseUrl(req));

    setBaseSecurityHeaders(res);
    applyCors(req, res);

    if (isApiPreflight(req, requestUrl)) {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      await handler(req, res, requestUrl);
    } catch (error) {
      handleError(res, error);
    }
  };
}

function getRequestBaseUrl(req) {
  const protocol =
    req.headers["x-forwarded-proto"] ||
    new URL(appConfig.appBaseUrl).protocol.replace(":", "");
  const host = req.headers.host || new URL(appConfig.appBaseUrl).host;
  return `${protocol}://${host}`;
}
