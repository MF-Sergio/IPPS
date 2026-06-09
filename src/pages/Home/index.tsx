import Hero from "./components/Hero.tsx";
import QuemSomos from "./components/QuemSomos/QuemSomos.jsx";
import NossoImpacto from "./components/NossoImpacto/NossoImpacto.jsx";

export default function Home() {
  return (
    <div className="bg-[var(--fundo)]">
      {/* Conteúdo da Home separe por sessoes, crie componentes de sessions para cada uma das sessões */}
      <Hero />
      <QuemSomos />
      <NossoImpacto />
    </div>
  );
}
