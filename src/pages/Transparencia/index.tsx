import Hero from "../Home/components/Hero.tsx";
import CabecalhoTransparencia from "./components/CabecalhoTransparencia";
import SecaoTransparencia from "./components/SecaoTransparencia.tsx";
import Doacao from "../Home/components/Doacao/Doacao";
import { OutrosParceiros } from "../Home/components/OutrosParceiros/OutrosParceiros";
import { recursosTransparencia } from "./components/transparenciaDados.ts";

export default function Transparencia() {
  return (
    <div className="transparencia-page bg-(--fundo)">
      <Hero imagens={[recursosTransparencia.hero]} />
      <CabecalhoTransparencia />
      <SecaoTransparencia />
      <Doacao />
      <OutrosParceiros />
    </div>
  );
}
