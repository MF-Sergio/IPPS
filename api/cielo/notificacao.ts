import { buildContainer } from "../../server/src/composition/container.ts";
import { handleRequest } from "../../server/src/router/router.ts";
import { withVercelApi } from "../../server/src/router/vercel-adapter.ts";

// PENDENTE: este endpoint so recebe notificacoes reais quando a aplicacao
// estiver publicada em uma URL HTTPS publica e essa URL for cadastrada na
// Cielo. Em desenvolvimento local, localhost nao e acessivel pelos servidores
// da Cielo; use um tunnel HTTPS temporario (por exemplo, Cloudflare Tunnel ou
// ngrok) apenas para homologacao e configure o header estatico correspondente
// em CIELO_NOTIFICATION_HEADER_NAME/VALUE. O cadastro externo nao pode ser
// automatizado pelo repositorio.
const container = buildContainer();

export default withVercelApi(handleRequest, container);
