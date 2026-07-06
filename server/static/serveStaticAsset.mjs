import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { distDir } from "../config/paths.mjs";
import { httpError } from "../utils/http.mjs";

export async function serveStaticAsset(req, res, requestUrl) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    throw httpError(405, "Método não permitido.", "METHOD_NOT_ALLOWED");
  }

  const safePath = path
    .normalize(decodeURIComponent(requestUrl.pathname))
    .replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(distDir, safePath);

  if (!filePath.startsWith(distDir)) {
    throw httpError(403, "Acesso negado.", "FORBIDDEN");
  }

  if (!existsSync(filePath) || (await stat(filePath)).isDirectory()) {
    filePath = path.join(distDir, "index.html");
  }

  if (!existsSync(filePath)) {
    throw httpError(
      404,
      "Build do frontend não encontrado. Rode npm run build.",
      "DIST_NOT_FOUND",
    );
  }

  res.setHeader("Content-Type", getContentType(filePath));
  res.setHeader("Cache-Control", getCacheControl(filePath));

  if (req.method === "HEAD") {
    res.writeHead(200);
    res.end();
    return;
  }

  const file = await readFile(filePath);
  res.writeHead(200);
  res.end(file);
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const types = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".pdf": "application/pdf",
  };

  return types[extension] || "application/octet-stream";
}

function getCacheControl(filePath) {
  return path.basename(filePath) === "index.html"
    ? "no-cache"
    : "public, max-age=31536000, immutable";
}
