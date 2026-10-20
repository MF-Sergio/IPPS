import { lazy } from "react";
import Home from "../pages/Home";

// Home fica no bundle principal (página de entrada/LCP); as demais rotas viram chunks sob demanda.
const SejaParceiro = lazy(() => import("../pages/SejaParceiro"));
const TrabalheConosco = lazy(() => import("../pages/TrabalheConosco"));
const QuemSomos = lazy(() => import("../pages/QuemSomos"));
const DoeAgora = lazy(() => import("../pages/DoeAgora"));
const PoliticaPrivacidade = lazy(() => import("../pages/PoliticaPrivacidade"));
const Contato = lazy(() => import("../pages/Contato"));
const Transparencia = lazy(() => import("../pages/Transparencia"));
const Eventos = lazy(() => import("../pages/Eventos"));
const NotFound = lazy(() => import("../pages/NotFound"));

export interface RouteSeo {
  title: string;
  description: string;
  noindex?: boolean;
}

// title/description/canonical por rota: sem isso todas as páginas declaravam canonical da Home
export const routes: { path: string; element: React.ReactNode; seo: RouteSeo }[] = [
  {
    path: "/",
    element: <Home />,
    seo: {
      title: "IPPS - Instituto de Pesquisa e Promoção da Saúde",
      description:
        "IPPS: 20 anos promovendo inclusão social, reabilitação e acolhimento de pessoas com deficiência no Rio de Janeiro. Conheça nossos projetos Vivendo e Acolhendo e Saúde Integral.",
    },
  },
  {
    path: "/doe-agora",
    element: <DoeAgora />,
    seo: {
      title: "Doe agora | IPPS",
      description:
        "Faça uma doação ao IPPS e apoie pessoas com deficiência e suas famílias na Zona Oeste do Rio de Janeiro.",
    },
  },
  {
    path: "/seja-parceiro",
    element: <SejaParceiro />,
    seo: {
      title: "Seja parceiro | IPPS",
      description:
        "Cadastre sua ONG ou empresa e faça parte da rede de parceiros do IPPS em projetos de inclusão social.",
    },
  },
  {
    path: "/trabalhe-conosco",
    element: <TrabalheConosco />,
    seo: {
      title: "Trabalhe conosco | IPPS",
      description:
        "Envie seu currículo e venha trabalhar no IPPS, promovendo saúde, cidadania e inclusão no Rio de Janeiro.",
    },
  },
  {
    path: "/quem-somos",
    element: <QuemSomos />,
    seo: {
      title: "Quem somos | IPPS",
      description:
        "Conheça a história do IPPS, organização sem fins lucrativos fundada em 2002 que atende pessoas com deficiência em Realengo e na Zona Oeste do Rio.",
    },
  },
  {
    path: "/politica-de-privacidade",
    element: <PoliticaPrivacidade />,
    seo: {
      title: "Política de privacidade | IPPS",
      description: "Saiba como o IPPS coleta, utiliza e protege os seus dados pessoais.",
    },
  },
  {
    path: "/contato",
    element: <Contato />,
    seo: {
      title: "Contato | IPPS",
      description:
        "Fale com o IPPS: Av. de Santa Cruz, 1631 - Realengo, Rio de Janeiro - RJ. Telefone e WhatsApp (21) 97552-0198.",
    },
  },
  {
    path: "/transparencia",
    element: <Transparencia />,
    seo: {
      title: "Transparência | IPPS",
      description:
        "Relatórios, termos de fomento e prestação de contas do IPPS - Instituto de Pesquisa e Promoção da Saúde.",
    },
  },
  {
    path: "/eventos",
    element: <Eventos />,
    seo: {
      title: "Eventos | IPPS",
      description: "Acompanhe os eventos e ações realizados pelo IPPS no Rio de Janeiro.",
    },
  },
  {
    path: "*",
    element: <NotFound />,
    seo: {
      title: "Página não encontrada | IPPS",
      description: "O endereço acessado não existe no site do IPPS.",
      noindex: true,
    },
  },
];
