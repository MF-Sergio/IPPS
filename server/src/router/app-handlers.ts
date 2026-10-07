import type { IncomingMessage, ServerResponse } from "node:http";
import type { LoggerPort } from "../domain/ports/logger.port.ts";
import type { RouterConfig } from "./router-config.ts";

/**
 * Forma dos handlers que `router.ts` e `vercel-adapter.ts` precisam para
 * rotear uma requisicao — nao o `Container` inteiro. `composition/container.ts`
 * satisfaz esta interface estruturalmente; o router depende so dela, nunca do
 * tipo `Container`, que pertence a `composition/` (camada proibida para
 * `router/`). Isso quebra o ciclo router -> composition -> router que existia
 * quando `router.ts` importava `Container` de volta de `composition/`.
 */
export interface AppHandlers {
  config: RouterConfig;
  logger: LoggerPort;
  health: {
    check(req: IncomingMessage, res: ServerResponse): Promise<void>;
  };
  donations: {
    create(req: IncomingMessage, res: ServerResponse): Promise<void>;
    status(req: IncomingMessage, res: ServerResponse, donationId: string): Promise<void>;
  };
  notification: {
    handle(req: IncomingMessage, res: ServerResponse): Promise<void>;
  };
}
