import "./env.mjs";
import { toPositiveNumber } from "../utils/number.mjs";
import { normalizeBaseUrl } from "../utils/url.mjs";

const port = toPositiveNumber(process.env.PORT || process.env.API_PORT, 3001);

export const appConfig = {
  port,
  appBaseUrl: normalizeBaseUrl(
    process.env.APP_BASE_URL || `http://localhost:${port}`,
  ),
  mercadoPagoPreferencesUrl: "https://api.mercadopago.com/checkout/preferences",
  maxBodyBytes: 16 * 1024,
  rateLimitWindowMs: toPositiveNumber(
    process.env.RATE_LIMIT_WINDOW_MS,
    10 * 60 * 1000,
  ),
  rateLimitMax: toPositiveNumber(process.env.RATE_LIMIT_MAX, 30),
  donationMinValue: toPositiveNumber(process.env.DONATION_MIN_VALUE, 5),
  donationMaxValue: toPositiveNumber(process.env.DONATION_MAX_VALUE, 10000),
  privacyTermsVersion: "2026-07-05",
};
