import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildContainer } from "./src/composition/container.ts";
import { loadEnvFiles } from "./src/infrastructure/config/env.ts";
import { handleRequest } from "./src/router/router.ts";
import { handleError } from "./src/router/error-handler.ts";
import { applyCors, isApiPreflight } from "./src/router/middleware/cors.ts";
import { setBaseSecurityHeaders } from "./src/router/middleware/security-headers.ts";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnvFiles(rootDir);

const container = buildContainer();

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", container.config.appBaseUrl);

  setBaseSecurityHeaders(res, container.config);
  applyCors(req, res, container.config);

  if (isApiPreflight(req, url)) {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    await handleRequest(req, res, url, container);
  } catch (error) {
    handleError(res, error, container.logger);
  }
});

server.listen(container.config.port, () => {
  container.logger.info("IPPS API no ar", { port: container.config.port });
});
