import { buildContainer } from "../../server/src/composition/container.ts";
import { withVercelApi } from "../../server/src/router/vercel-adapter.ts";

const container = buildContainer();

export default withVercelApi(
  async (req, res) => container.notification.handle(req, res),
  container,
);
