import { createServer } from "node:http";
import { handleRequest } from "./api/router.mjs";
import { appConfig } from "./config/app.mjs";
import { applyCors, isApiPreflight } from "./middleware/cors.mjs";
import { setBaseSecurityHeaders } from "./middleware/securityHeaders.mjs";
import { handleError } from "./utils/http.mjs";

const server = createServer(async (req, res) => {
  const requestUrl = new URL(req.url || "/", appConfig.appBaseUrl);

  setBaseSecurityHeaders(res);
  applyCors(req, res);

  if (isApiPreflight(req, requestUrl)) {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    await handleRequest(req, res, requestUrl);
  } catch (error) {
    handleError(res, error);
  }
});

server.listen(appConfig.port, () => {
  console.log(`IPPS API ouvindo em http://localhost:${appConfig.port}`);
});
