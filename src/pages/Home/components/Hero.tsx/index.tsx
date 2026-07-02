import Carrossel from "../carrossel/carrossel";
import img1 from "../../../../assets/img/hero_home.png";

interface HeroProps {
  imagens?: string[];
}

export default function Hero({ imagens = [img1] }: HeroProps) {
  return (
    <section className="container mx-auto">
      <Carrossel imagens={imagens} imagensPorSlide={1} />
    </section>
  );
}
