import type { IncomingMessage, ServerResponse } from "node:http";

export interface FakeRequestOptions {
  method?: string;
  url?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export function fakeRequest(options: FakeRequestOptions = {}): IncomingMessage {
  return {
    method: options.method ?? "POST",
    url: options.url ?? "/api/doacoes",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:5173",
      ...options.headers,
    },
    body: options.body,
    socket: { remoteAddress: "1.2.3.4" },
  } as unknown as IncomingMessage;
}

export interface FakeResponseState {
  status: number;
  headers: Record<string, string>;
  body: string;
}

export function fakeResponse(): { res: ServerResponse; state: FakeResponseState } {
  const state: FakeResponseState = { status: 0, headers: {}, body: "" };

  const res = {
    setHeader(key: string, value: string) {
      state.headers[key] = value;
    },
    writeHead(status: number, headers?: Record<string, string>) {
      state.status = status;
      Object.assign(state.headers, headers ?? {});
      return res;
    },
    end(body?: string) {
      state.body = body ?? "";
      return res;
    },
  };

  return { res: res as unknown as ServerResponse, state };
}

export function readBody(state: FakeResponseState): Record<string, unknown> {
  return JSON.parse(state.body) as Record<string, unknown>;
}
