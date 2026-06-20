import Carrossel from "../carrossel/carrossel";
import img1 from "../../../../assets/img/foto1.jpg";
import img2 from "../../../../assets/img/foto2.jpg";
import img3 from "../../../../assets/img/foto3.jpg";
import img4 from "../../../../assets/img/foto4.jpg";

export default function Hero() {
  return (
    <section className="container mx-auto">
      <Carrossel imagens={[img1, img2, img3, img4]} imagensPorSlide={1} />
    </section>
  );
}
