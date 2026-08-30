import type { DonationLimits } from "../../domain/donation/donation.rules.ts";
import { Money } from "../../domain/shared/money.ts";

export class MissingEnvError extends Error {
  readonly code = "MISSING_ENV";

  constructor(message: string) {
    super(message);
    this.name = "MissingEnvError";
  }
}

export interface CieloConfig {
  merchantId: string;
  merchantKey: string;
  environment: "sandbox" | "production";
  transactionBaseUrl: string;
  queryBaseUrl: string;
  timeoutMs: number;
  softDescriptor: string;
  boleto: {
    provider: string;
    assignor: string;
    identification: string;
    instructions: string;
    expirationDays: number;
  };
  notificationHeaderName: string | null;
  notificationHeaderValue: string | null;
}

export interface AppConfig {
  port: number;
  appBaseUrl: string;
  allowedOrigins: Set<string>;
  maxBodyBytes: number;
  rateLimitWindowMs: number;
  rateLimitMax: number;
  donationLimits: DonationLimits;
  privacyTermsVersion: string;
  cielo: CieloConfig;
}

type Env = Record<string, string | undefined>;

function requireEnv(env: Env, key: string): string {
  const value = env[key]?.trim();
  if (!value) {
    throw new MissingEnvError(`Variavel de ambiente obrigatoria ausente: ${key}`);
  }
  return value;
}

function toPositiveNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/** A grafia do SoftDescriptor da Cielo aceita no maximo 13 caracteres. */
function normalizeSoftDescriptor(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase()
    .slice(0, 13) || "IPPS";
}

export function buildAppConfig(env: Env): AppConfig {
  const merchantId = requireEnv(env, "CIELO_MERCHANT_ID");
  const merchantKey = requireEnv(env, "CIELO_MERCHANT_KEY");
  const environment = env["CIELO_ENVIRONMENT"] === "production" ? "production" : "sandbox";

  const min = Money.fromReais(toPositiveNumber(env["DONATION_MIN_VALUE"], 5));
  const max = Money.fromReais(toPositiveNumber(env["DONATION_MAX_VALUE"], 10000));
  if (min.isGreaterThan(max)) {
    throw new MissingEnvError("DONATION_MIN_VALUE nao pode ser maior que DONATION_MAX_VALUE.");
  }

  const port = toPositiveNumber(env["PORT"] ?? env["API_PORT"], 3001);
  const appBaseUrl = (env["APP_BASE_URL"] ?? `http://localhost:${port}`).replace(/\/$/, "");

  const allowedOrigins = new Set<string>([new URL(appBaseUrl).origin]);
  // Origens de dev nunca devem contar como confiaveis em producao — senao um
  // request forjado com Origin localhost passaria pelo controle indevidamente.
  // `localhost:${port}` entra na mesma guarda: e origem de dev tanto quanto
  // as de :5173, so que do servidor local, nao do Vite.
  if (env["NODE_ENV"] !== "production") {
    allowedOrigins.add(`http://localhost:${port}`);
    allowedOrigins.add("http://localhost:5173");
    allowedOrigins.add("http://127.0.0.1:5173");
  }
  for (const origin of String(env["ALLOWED_ORIGINS"] ?? "").split(",")) {
    const trimmed = origin.trim();
    if (trimmed) allowedOrigins.add(trimmed);
  }

  return {
    port,
    appBaseUrl,
    allowedOrigins,
    maxBodyBytes: 16 * 1024,
    rateLimitWindowMs: toPositiveNumber(env["RATE_LIMIT_WINDOW_MS"], 10 * 60 * 1000),
    rateLimitMax: toPositiveNumber(env["RATE_LIMIT_MAX"], 30),
    donationLimits: { min, max },
    privacyTermsVersion: env["PRIVACY_TERMS_VERSION"] ?? "2026-07-05",
    cielo: {
      merchantId,
      merchantKey,
      environment,
      transactionBaseUrl:
        environment === "production"
          ? "https://api.cieloecommerce.cielo.com.br"
          : "https://apisandbox.cieloecommerce.cielo.com.br",
      queryBaseUrl:
        environment === "production"
          ? "https://apiquery.cieloecommerce.cielo.com.br"
          : "https://apiquerysandbox.cieloecommerce.cielo.com.br",
      timeoutMs: toPositiveNumber(env["CIELO_TIMEOUT_MS"], 20_000),
      softDescriptor: normalizeSoftDescriptor(env["CIELO_SOFT_DESCRIPTOR"] ?? "IPPS"),
      boleto: {
        provider: env["CIELO_BOLETO_PROVIDER"] ?? "Bradesco2",
        assignor: env["CIELO_BOLETO_ASSIGNOR"] ?? "IPPS",
        identification: String(env["CIELO_BOLETO_IDENTIFICATION"] ?? "").replace(/\D/g, ""),
        instructions:
          env["CIELO_BOLETO_INSTRUCTIONS"] ?? "Aceitar somente ate a data de vencimento.",
        expirationDays: toPositiveNumber(env["CIELO_BOLETO_EXPIRATION_DAYS"], 3),
      },
      notificationHeaderName: env["CIELO_NOTIFICATION_HEADER_NAME"]?.trim() || null,
      notificationHeaderValue: env["CIELO_NOTIFICATION_HEADER_VALUE"]?.trim() || null,
    },
  };
}
