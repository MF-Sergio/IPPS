import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildContainer } from "./src/composition/container.ts";
import { loadEnvFiles } from "./src/infrastructure/config/env.ts";
import { handleRequest } from "./src/router/router.ts";
import { withVercelApi } from "./src/router/vercel-adapter.ts";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnvFiles(rootDir);

const container = buildContainer();

const server = createServer(withVercelApi(handleRequest, container));

server.listen(container.config.port, () => {
  container.logger.info("IPPS API no ar", { port: container.config.port });
});
