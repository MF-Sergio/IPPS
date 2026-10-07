import type { IncomingMessage, ServerResponse } from "node:http";
import type { AppHandlers } from "./app-handlers.ts";
import { handleError } from "./error-handler.ts";
import { applyCors, isApiPreflight } from "./middleware/cors.ts";
import { setBaseSecurityHeaders } from "./middleware/security-headers.ts";

export type ApiHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
  container: AppHandlers,
) => Promise<void>;

function requestUrl(req: IncomingMessage, container: AppHandlers): URL {
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
export function withVercelApi(handler: ApiHandler, container: AppHandlers) {
  return async function vercelHandler(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void> {
    setBaseSecurityHeaders(res, container.config);
    applyCors(req, res, container.config);

    try {
      // `req.headers.host` e `x-forwarded-proto` vem do cliente e nao sao
      // validados — um host malformado faz `new URL(...)` lancar. Isso
      // precisa cair no mesmo catch que devolve JSON, Cache-Control e log,
      // senao a excecao escapa do handler inteiro (na rota do webhook isso
      // vira um nao-200, e a Cielo reenfileira a cada 30 min).
      const url = requestUrl(req, container);

      if (isApiPreflight(req, url)) {
        res.writeHead(204);
        res.end();
        return;
      }

      await handler(req, res, url, container);
    } catch (error) {
      handleError(res, error, container.logger);
    }
  };
}
