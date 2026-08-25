import { IntroEventos } from "./components/IntroEventos";
import { CardsEventos } from "./components/CardsEventos";

export default function PaginaEventos() {
  return (
    <div className="pb-16 text-left">
      <IntroEventos />
      <CardsEventos />
    </div>
  );
}
