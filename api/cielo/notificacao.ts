import { buildContainer } from "../../server/src/composition/container.ts";
import { handleRequest } from "../../server/src/router/router.ts";
import { withVercelApi } from "../../server/src/router/vercel-adapter.ts";

const container = buildContainer();

export default withVercelApi(handleRequest, container);
