import type { IncomingMessage, ServerResponse } from "node:http";
import type { AppHandlers } from "./app-handlers.ts";
import { handleError } from "./error-handler.ts";
import { HttpError } from "./http-context.ts";

const STATUS_ROUTE = /^\/api\/doacoes\/([^/]+)\/status$/;

export async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
  url: URL,
  container: AppHandlers,
): Promise<void> {
  try {
    const method = req.method ?? "GET";
    const { pathname } = url;

    if (pathname === "/api/health") {
      if (method !== "GET") throw methodNotAllowed(method);
      await container.health.check(req, res);
      return;
    }

    if (pathname === "/api/doacoes") {
      if (method !== "POST") throw methodNotAllowed(method);
      await container.donations.create(req, res);
      return;
    }

    const statusMatch = STATUS_ROUTE.exec(pathname);
    if (statusMatch) {
      if (method !== "GET") throw methodNotAllowed(method);
      await container.donations.status(req, res, decodeURIComponent(statusMatch[1] ?? ""));
      return;
    }

    if (pathname === "/api/cielo/notificacao") {
      if (method !== "POST") throw methodNotAllowed(method);
      await container.notification.handle(req, res);
      return;
    }

    throw new HttpError(404, "Rota de API nao encontrada.", "API_NOT_FOUND");
  } catch (error) {
    handleError(res, error, container.logger);
  }
}

function methodNotAllowed(method: string): HttpError {
  return new HttpError(405, `Metodo ${method} nao permitido nesta rota.`, "METHOD_NOT_ALLOWED");
}
