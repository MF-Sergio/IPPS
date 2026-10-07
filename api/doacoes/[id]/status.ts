import { buildContainer } from "../../../server/src/composition/container.ts";
import { handleRequest } from "../../../server/src/router/router.ts";
import { withVercelApi } from "../../../server/src/router/vercel-adapter.ts";

const container = buildContainer();

// O id da doacao vem do pathname, casado pela mesma regex de router.ts que
// atende o servidor local — Vercel ja decidiu que esta funcao responde a
// /api/doacoes/{id}/status antes de nos chamar, entao rotear de novo pelo
// pathname aqui e redundante mas inofensivo. Se um runtime futuro da Vercel
// entregar um req.url reescrito que perca o path original, e aqui que a rota
// pararia de casar (handleRequest cairia em API_NOT_FOUND) — sinal a observar
// no primeiro deploy real.
export default withVercelApi(handleRequest, container);
