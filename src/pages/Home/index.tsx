import Hero from "./components/Hero.tsx";
import QuemSomos from "./components/quemSomos/QuemSomos.js";

export default function Home() {
  return (
    <div className="bg-[var(--fundo)]">
      {/* Conteúdo da Home separe por sessoes, crie componentes de sessions para cada uma das sessões */}
      <Hero />
      <QuemSomos />
    </div>
  );
}
