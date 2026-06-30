import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./carrossel.module.css";

interface CarrosselProps {
  imagens: string[];
  imagensPorSlide?: number;
  isOutrosParceiros?: boolean;
}

export function Carrossel({
  imagens,
  imagensPorSlide = 3,
  isOutrosParceiros = false,
}: CarrosselProps) {
  const slides: string[][] = [];

  for (let i = 0; i < imagens.length; i += imagensPorSlide) {
    slides.push(imagens.slice(i, i + imagensPorSlide));
  }

  return (
    <Carousel
      showArrows
      infiniteLoop
      autoPlay
      showThumbs={false}
      showIndicators={false}
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          style={{
            display: "flex",
            gap: isOutrosParceiros ? "65px" : "10px",
            justifyContent: "center",
          }}
        >
          {slide.map((imagem, imageIndex) => (
            <img
              key={imageIndex}
              src={imagem}
              alt={`Imagem ${imageIndex + 1}`}
              style={{
                width: isOutrosParceiros ? "75px" : `${100 / imagensPorSlide}%`,
                height: isOutrosParceiros ? "75px" : "auto",
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      ))}
    </Carousel>
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
