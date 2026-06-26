import Home from "../pages/Home";
import SejaParceiro from "../pages/SejaParceiro";
import TrabalheConosco from "../pages/TrabalheConosco";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/seja-parceiro", element: <SejaParceiro /> },
  { path: "/trabalhe-conosco", element: <TrabalheConosco /> },
];
