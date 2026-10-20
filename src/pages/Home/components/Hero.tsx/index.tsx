import Carrossel from "../carrossel/carrossel";
import img1 from "../../../../assets/img/hero_home.webp";
import img1Mobile from "../../../../assets/img/hero_home-640.webp";
import img1Tablet from "../../../../assets/img/hero_home-828.webp";

interface HeroProps {
  imagens?: string[];
  srcSets?: string[];
}

const ALT = "Atendidos e equipe do IPPS";
const SIZES = "(max-width: 1160px) 100vw, 1160px";

export default function Hero({
  imagens = [img1],
  srcSets = [`${img1Mobile} 640w, ${img1Tablet} 828w, ${img1} 1160w`],
}: HeroProps) {
  return (
    <section className="container mx-auto items-center">
      {imagens.length === 1 ? (
        // uma imagem só: <img> direto (o carrossel com infiniteLoop clonava o slide e gerava layout shift)
        <img
          src={imagens[0]}
          srcSet={srcSets[0]}
          sizes={SIZES}
          alt={ALT}
          width={1160}
          height={605}
          fetchPriority="high"
          decoding="async"
          className="h-auto w-full"
        />
      ) : (
        <Carrossel
          imagens={imagens}
          imagensPorSlide={1}
          imagemLargura={1160}
          imagemAltura={605}
          prioritario
          alt={ALT}
          srcSets={srcSets}
          sizes={SIZES}
        />
      )}
    </section>
  );
}
