import type { IncomingMessage, ServerResponse } from "node:http";
import type { RouterConfig } from "../router-config.ts";

export function applyCors(
  req: IncomingMessage,
  res: ServerResponse,
  config: RouterConfig,
): void {
  const origin = req.headers.origin;
  if (!origin || !config.allowedOrigins.has(origin)) return;

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "600");
}

export function isApiPreflight(req: IncomingMessage, url: URL): boolean {
  return req.method === "OPTIONS" && url.pathname.startsWith("/api/");
}

export function isTrustedBrowserRequest(req: IncomingMessage, config: RouterConfig): boolean {
  const origin = req.headers.origin;
  if (origin) return config.allowedOrigins.has(origin);

  const referer = req.headers.referer;
  if (referer) {
    try {
      return config.allowedOrigins.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return process.env["NODE_ENV"] !== "production";
}
