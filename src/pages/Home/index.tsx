import Hero from "./components/Hero.tsx";
import QuemSomos from "./components/quemSomos/QuemSomos.tsx";
import NossoImpacto from "./components/NossoImpacto/NossoImpacto.jsx";
import NossosProjetos from "./components/NossosProjetos/NossosProjetos.jsx";
import Abrangencia from "./components/Abrangencia/Abrangencia.jsx";
import Parceira from "./components/Parceira/Parceira.jsx";
import Doacao from "./components/Doacao/Doacao.tsx";
import { OutrosParceiros } from "./components/OutrosParceiros/OutrosParceiros.tsx";

export default function Home() {
  return (
    <div className="bg-[var(--fundo)]">
      {/* Conteúdo da Home separe por sessoes, crie componentes de sessions para cada uma das sessões */}
      <Hero />
      <QuemSomos />
      <NossoImpacto />
      <NossosProjetos />
      <Abrangencia />
      <Parceira />
      <Doacao />
      <OutrosParceiros />
    </div>
  );
}
