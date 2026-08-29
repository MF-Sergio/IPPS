import type { IncomingMessage, ServerResponse } from "node:http";
import type { Container } from "../composition/container.ts";
import { handleError } from "./error-handler.ts";
import { applyCors, isApiPreflight } from "./middleware/cors.ts";
import { setBaseSecurityHeaders } from "./middleware/security-headers.ts";

export type ApiHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
  container: Container,
) => Promise<void>;

function requestUrl(req: IncomingMessage, container: Container): URL {
  const protocol =
    (req.headers["x-forwarded-proto"] as string | undefined) ??
    new URL(container.config.appBaseUrl).protocol.replace(":", "");
  const host = req.headers.host ?? new URL(container.config.appBaseUrl).host;
  return new URL(req.url ?? "/", `${protocol}://${host}`);
}

/**
 * Envolve um handler com as preocupacoes que valem para toda a borda:
 * headers de seguranca, CORS, preflight e traducao de erro.
 */
export function withVercelApi(handler: ApiHandler, container: Container) {
  return async function vercelHandler(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    const url = requestUrl(req, container);

    setBaseSecurityHeaders(res, container.config);
    applyCors(req, res, container.config);

    if (isApiPreflight(req, url)) {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      await handler(req, res, url, container);
    } catch (error) {
      handleError(res, error, container.logger);
    }
  };
}
