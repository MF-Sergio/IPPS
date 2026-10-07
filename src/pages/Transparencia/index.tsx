import Hero from "./components/Hero.tsx";
import CabecalhoTransparencia from "./components/CabecalhoTransparencia";
import SecaoTransparencia from "./components/SecaoTransparencia.tsx";
import Doacao from "../Home/components/Doacao/Doacao";
import { OutrosParceiros } from "../Home/components/OutrosParceiros/OutrosParceiros";

export default function Transparencia() {
  return (
    <div className="transparencia-page">
      <Hero />
      <CabecalhoTransparencia />
      <SecaoTransparencia />
      <Doacao />
      <OutrosParceiros />
    </div>
  );
}
