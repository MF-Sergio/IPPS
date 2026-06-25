import Home from "../pages/Home";
import SejaParceiro from "../pages/SejaParceiro";
import QuemSomos from "../pages/QuemSomos";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/seja-parceiro", element: <SejaParceiro /> },
  { path: "/quem-somos", element: <QuemSomos /> },
];
