/**
 * Forma estreita de configuracao que o `router/` realmente usa — so os campos
 * lidos por CORS, rate limit, autenticacao do webhook e cabecalhos de
 * seguranca. `AppConfig` (infrastructure/config/app.config.ts) tem muito mais
 * campos (credenciais da Cielo, limites de doacao etc.) que o router nunca
 * deveria poder ler; declarar essa forma aqui, dentro do proprio `router/`,
 * evita que o router precise importar de `infrastructure/` so para nomear um
 * tipo — nem para tipos, a regra de camada permite isso.
 *
 * `composition/container.ts` monta o `AppConfig` completo e o repassa como
 * este tipo: `AppConfig` e estruturalmente compativel (tem todos os campos
 * abaixo, e mais), entao nenhuma conversao e necessaria.
 */
export interface WebhookAuthConfig {
  notificationHeaderName: string | null;
  notificationHeaderValue: string | null;
}

export interface RouterConfig {
  allowedOrigins: Set<string>;
  maxBodyBytes: number;
  rateLimitMax: number;
  rateLimitWindowMs: number;
  appBaseUrl: string;
  cielo: WebhookAuthConfig;
}
