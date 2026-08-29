import { buildContainer } from "../../../server/src/composition/container.ts";
import { withVercelApi } from "../../../server/src/router/vercel-adapter.ts";

const container = buildContainer();

export default withVercelApi(async (req, res, url) => {
  // Em rota dinamica da Vercel o id chega em req.query; o fallback pela URL
  // mantem o handler funcionando fora da Vercel, sem depender do runtime dela.
  const fromQuery = (req as { query?: Record<string, string | string[]> }).query?.["id"];
  const id = Array.isArray(fromQuery)
    ? fromQuery[0] ?? ""
    : fromQuery ?? url.pathname.split("/").at(-2) ?? "";

  await container.donations.status(req, res, id);
}, container);
