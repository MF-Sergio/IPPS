import Hero from "../Home/components/Hero.tsx";
import transparenciaHero from "../../assets/img/foto_hero_transparencia.png";
import { ConteudoTransparencia } from "./components/TransparencyContent";
import Doacao from "../Home/components/Doacao/Doacao";
import { OutrosParceiros } from "../Home/components/OutrosParceiros/OutrosParceiros";

export default function Transparencia() {
  return (
    <div className="transparencia-page bg-(--fundo)">
      <Hero imagens={[transparenciaHero]} />
      <ConteudoTransparencia />
      <Doacao />
      <OutrosParceiros />
    </div>
  );
}
