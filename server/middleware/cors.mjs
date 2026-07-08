import { appConfig } from "../config/app.mjs";

const allowedOrigins = buildAllowedOrigins();

export function applyCors(req, res) {
  const origin = req.headers.origin;

  if (!origin || !allowedOrigins.has(origin)) {
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "600");
}

export function isApiPreflight(req, requestUrl) {
  return req.method === "OPTIONS" && requestUrl.pathname.startsWith("/api/");
}

export function isTrustedBrowserRequest(req) {
  const origin = req.headers.origin;

  if (origin) {
    return allowedOrigins.has(origin);
  }

  const referer = req.headers.referer;
  if (referer) {
    try {
      return allowedOrigins.has(new URL(referer).origin);
    } catch {
      return false;
    }
  }

  return process.env.NODE_ENV !== "production";
}

function buildAllowedOrigins() {
  const origins = new Set([
    new URL(appConfig.appBaseUrl).origin,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
  ]);

  for (const origin of String(process.env.ALLOWED_ORIGINS || "").split(",")) {
    const trimmed = origin.trim();
    if (trimmed) {
      origins.add(trimmed);
    }
  }

  return origins;
}
