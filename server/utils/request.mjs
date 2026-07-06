import { appConfig } from "../config/app.mjs";
import { httpError } from "./http.mjs";
import { parseJson } from "./json.mjs";

export async function readJsonBody(req) {
  const contentType = String(req.headers["content-type"] || "");
  const contentLength = Number(req.headers["content-length"] || 0);

  if (!contentType.toLowerCase().includes("application/json")) {
    throw httpError(
      415,
      "Envie a requisição como application/json.",
      "UNSUPPORTED_MEDIA_TYPE",
    );
  }

  if (contentLength > appConfig.maxBodyBytes) {
    throw httpError(413, "Payload muito grande.", "PAYLOAD_TOO_LARGE");
  }

  try {
    if (req.body !== undefined) {
      return parseVercelBody(req.body);
    }
  } catch (error) {
    if (error?.statusCode) {
      throw error;
    }

    throw httpError(400, "JSON inválido.", "INVALID_JSON");
  }

  const chunks = [];
  let totalBytes = 0;

  for await (const chunk of req) {
    totalBytes += chunk.length;

    if (totalBytes > appConfig.maxBodyBytes) {
      throw httpError(413, "Payload muito grande.", "PAYLOAD_TOO_LARGE");
    }

    chunks.push(chunk);
  }

  const body = Buffer.concat(chunks).toString("utf8");

  if (!body) {
    throw httpError(400, "Corpo da requisição vazio.", "EMPTY_BODY");
  }

  const parsed = parseJson(body);
  if (!parsed || Array.isArray(parsed)) {
    throw httpError(400, "JSON inválido.", "INVALID_JSON");
  }

  return parsed;
}

function parseVercelBody(body) {
  if (Buffer.isBuffer(body)) {
    return parseBodyText(body.toString("utf8"));
  }

  if (typeof body === "string") {
    return parseBodyText(body);
  }

  if (!body || Array.isArray(body) || typeof body !== "object") {
    throw httpError(400, "JSON inválido.", "INVALID_JSON");
  }

  return body;
}

function parseBodyText(body) {
  if (!body) {
    throw httpError(400, "Corpo da requisição vazio.", "EMPTY_BODY");
  }

  const parsed = parseJson(body);
  if (!parsed || Array.isArray(parsed)) {
    throw httpError(400, "JSON inválido.", "INVALID_JSON");
  }

  return parsed;
}
