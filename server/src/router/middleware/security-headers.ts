import type { ServerResponse } from "node:http";
import type { AppConfig } from "../../infrastructure/config/app.config.ts";

export function setBaseSecurityHeaders(res: ServerResponse, config: AppConfig): void {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      // data: e necessario porque o QR Code do Pix chega como base64 e e
      // renderizado no proprio site, sem redirecionar para gateway nenhum.
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'",
    ].join("; "),
  );

  if (config.appBaseUrl.startsWith("https://")) {
    res.setHeader("Strict-Transport-Security", "max-age=15552000; includeSubDomains");
  }
}
