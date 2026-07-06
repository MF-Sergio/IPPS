import Home from "../pages/Home";
import SejaParceiro from "../pages/SejaParceiro";
import TrabalheConosco from "../pages/TrabalheConosco";
import QuemSomos from "../pages/QuemSomos";
import DoeAgora from "../pages/DoeAgora";
import PoliticaPrivacidade from "../pages/PoliticaPrivacidade";
import Contato from "../pages/Contato";
import Transparencia from "../pages/Transparencia";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/doe-agora", element: <DoeAgora /> },
  { path: "/seja-parceiro", element: <SejaParceiro /> },
  { path: "/trabalhe-conosco", element: <TrabalheConosco /> },
  { path: "/quem-somos", element: <QuemSomos /> },
  { path: "/politica-de-privacidade", element: <PoliticaPrivacidade /> },
  { path: "/contato", element: <Contato /> },
  { path: "/transparencia", element: <Transparencia /> },
];
