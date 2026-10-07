import type { IncomingMessage, ServerResponse } from "node:http";
import { sendJson } from "../http-context.ts";

export function createHealthController() {
  return {
    async check(_req: IncomingMessage, res: ServerResponse): Promise<void> {
      sendJson(res, 200, { ok: true }, { "Cache-Control": "no-store" });
    },
  };
}
