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

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/doe-agora", element: <DoeAgora /> },
  { path: "/seja-parceiro", element: <SejaParceiro /> },
  { path: "/trabalhe-conosco", element: <TrabalheConosco /> },
  { path: "/quem-somos", element: <QuemSomos /> },
  { path: "/politica-de-privacidade", element: <PoliticaPrivacidade /> },
  { path: "/contato", element: <Contato /> },
  { path: "/transparencia", element: <Transparencia /> },
  { path: "/eventos", element: <Eventos /> },
];
