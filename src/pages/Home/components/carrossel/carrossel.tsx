import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./carrossel.module.css";

interface CarrosselProps {
  imagens: string[];
  imagensPorSlide?: number;
  isOutrosParceiros?: boolean;
  altura?: string | number;
  // dimensões reais da imagem: o navegador reserva o espaço e evita layout shift
  imagemLargura?: number;
  imagemAltura?: number;
  // carrega o primeiro slide com prioridade (imagem LCP)
  prioritario?: boolean;
  alt?: string;
  // alt por imagem (mesmo índice de `imagens`); sem ele usa `${alt} N`
  alts?: string[];
  // srcset por imagem (mesmo índice de `imagens`) para servir arquivo menor no mobile
  srcSets?: string[];
  sizes?: string;
}

export function Carrossel({
  imagens,
  imagensPorSlide = 3,
  isOutrosParceiros = false,
  altura = "auto",
  imagemLargura,
  imagemAltura,
  prioritario = false,
  alt = "Imagem",
  alts,
  srcSets,
  sizes,
}: CarrosselProps) {
  // WCAG 2.2.2: conteúdo que se move sozinho precisa de pausa; começa pausado com reduced-motion
  const [pausado, setPausado] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
  );
  const slides: string[][] = [];

  for (let i = 0; i < imagens.length; i += imagensPorSlide) {
    slides.push(imagens.slice(i, i + imagensPorSlide));
  }
  const variosSlides = slides.length > 1;

  return (
    <div className="relative">
    {variosSlides && (
      <button
        type="button"
        onClick={() => setPausado((atual) => !atual)}
        aria-pressed={pausado}
        className="absolute right-2 bottom-2 z-10 min-h-6 cursor-pointer rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-black shadow"
      >
        {pausado ? "Retomar carrossel" : "Pausar carrossel"}
      </button>
    )}
    <Carousel
      showArrows
      infiniteLoop={variosSlides}
      autoPlay={variosSlides && !pausado}
      stopOnHover
      showThumbs={false}
      showIndicators={false}
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          style={{
            display: "flex",
            gap: isOutrosParceiros ? "3rem" : "1rem",
            justifyContent: "center",
            alignItems: "center",
            height: altura,
          }}
        >
          {slide.map((imagem, imageIndex) => (
            <img
              key={imageIndex}
              src={imagem}
              srcSet={srcSets?.[slideIndex * imagensPorSlide + imageIndex]}
              sizes={sizes}
              alt={
                alts?.[slideIndex * imagensPorSlide + imageIndex] ??
                `${alt} ${slideIndex * imagensPorSlide + imageIndex + 1}`
              }
              width={imagemLargura}
              height={imagemAltura}
              // logos de parceiros são leves (~32 KB juntas): lazy deixava slides/clones vazios na transição do carrossel
              loading={isOutrosParceiros || (prioritario && slideIndex === 0) ? "eager" : "lazy"}
              fetchPriority={prioritario && slideIndex === 0 ? "high" : "auto"}
              decoding="async"
              style={{
                width: isOutrosParceiros ? "75px" : `${100 / imagensPorSlide}%`,
                height: isOutrosParceiros ? "75px" : altura,
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      ))}
    </Carousel>
    </div>
  );
}

export default Carrossel;

/* import React from "react";
import styles from "./carrossel.module.css";
import img1 from "../../../../assets/img/foto1.jpg";
import img2 from "../../../../assets/img/foto2.jpg";
import img3 from "../../../../assets/img/foto3.jpg";
import img4 from "../../../../assets/img/foto4.jpg";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export function Carrossel() {
  return (
    <Carousel showArrows={true} infiniteLoop={true} autoPlay={true}>
      <div>
        <img src={img1} alt="Image 1" />
      </div>
      <div>
        <img src={img2} alt="Image 2" />
      </div>
      <div>
        <img src={img3} alt="Image 3" />
      </div>
      <div>
        <img src={img4} alt="Image 4" />
      </div>
    </Carousel>
  );
}

export default Carrossel; */
