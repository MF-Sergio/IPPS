import { withVercelApi } from "../server/vercel/withVercelApi.mjs";
import { sendJson } from "../server/utils/http.mjs";

export default withVercelApi(async (_req, res) => {
  sendJson(res, 200, { ok: true });
});
