import type { IncomingMessage, ServerResponse } from "node:http";

export class HttpError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details: Record<string, string> | undefined;

  constructor(
    statusCode: number,
    message: string,
    code: string,
    details?: Record<string, string>,
  ) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export function sendJson(
  res: ServerResponse,
  status: number,
  payload: unknown,
  headers: Record<string, string> = {},
): void {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  });
  res.end(JSON.stringify(payload));
}

export function getClientIp(req: IncomingMessage): string {
  // `x-real-ip` e preenchido pela Vercel com o IP real da conexao, sem passar
  // pelo cliente. `x-forwarded-for` pode ter varias entradas concatenadas
  // pelos proxies no caminho: a PRIMEIRA e a ponta que o cliente controla (e
  // pode forjar rotacionando o header a cada tentativa); a ULTIMA e a que o
  // proxy mais proximo de nos de fato viu.
  const realIp = String(req.headers["x-real-ip"] ?? "").trim();
  const forwardedFor = String(req.headers["x-forwarded-for"] ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .at(-1);

  return (
    realIp ||
    forwardedFor ||
    String(req.headers["cf-connecting-ip"] ?? "") ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}

export async function readJsonBody(
  req: IncomingMessage,
  maxBytes: number,
): Promise<Record<string, unknown>> {
  const contentType = String(req.headers["content-type"] ?? "").toLowerCase();
  if (!contentType.includes("application/json")) {
    throw new HttpError(415, "Envie a requisicao como application/json.", "UNSUPPORTED_MEDIA_TYPE");
  }

  if (Number(req.headers["content-length"] ?? 0) > maxBytes) {
    throw new HttpError(413, "Payload muito grande.", "PAYLOAD_TOO_LARGE");
  }

  // A Vercel ja pode ter parseado o corpo antes de chamar o handler.
  const preParsed = (req as IncomingMessage & { body?: unknown }).body;
  if (preParsed !== undefined) {
    if (typeof preParsed === "string") return parseBodyText(preParsed);
    if (Buffer.isBuffer(preParsed)) return parseBodyText(preParsed.toString("utf8"));
    if (preParsed && typeof preParsed === "object" && !Array.isArray(preParsed)) {
      return preParsed as Record<string, unknown>;
    }
    throw new HttpError(400, "JSON invalido.", "INVALID_JSON");
  }

  const chunks: Buffer[] = [];
  let total = 0;

  for await (const chunk of req) {
    const buffer = chunk as Buffer;
    total += buffer.length;
    if (total > maxBytes) {
      throw new HttpError(413, "Payload muito grande.", "PAYLOAD_TOO_LARGE");
    }
    chunks.push(buffer);
  }

  return parseBodyText(Buffer.concat(chunks).toString("utf8"));
}

function parseBodyText(text: string): Record<string, unknown> {
  if (!text) {
    throw new HttpError(400, "Corpo da requisicao vazio.", "EMPTY_BODY");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new HttpError(400, "JSON invalido.", "INVALID_JSON");
  }

  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new HttpError(400, "JSON invalido.", "INVALID_JSON");
  }

  return parsed as Record<string, unknown>;
}
