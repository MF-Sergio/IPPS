import { IntroEventos } from "./components/IntroEventos";
import { CardsEventos } from "./components/CardsEventos";

export default function PaginaEventos() {
  return (
    <div className="bg-[var(--fundo)] pb-16 text-left">
      <IntroEventos />
      <CardsEventos />
    </div>
  );
}
