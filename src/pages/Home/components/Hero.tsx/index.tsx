import Carrossel from "../carrossel/carrossel";
import img1 from "../../../../assets/img/hero_home.png";

export default function Hero() {
  return (
    <section className="container mx-auto">
      <Carrossel imagens={[img1]} imagensPorSlide={1} />
    </section>
  );
}
