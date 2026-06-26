import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import foto1 from "../../../../assets/img/foto1.jpg";
import foto2 from "../../../../assets/img/foto2.jpg";
import foto3 from "../../../../assets/img/foto3.jpg";
import foto4 from "../../../../assets/img/foto4.jpg";

const slides = [
  [foto1, foto2, foto3],
  [foto2, foto3, foto4],
  [foto3, foto4, foto1],
];

export default function NossaHistoria() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[var(--vermelho)] lg:text-4xl">
          Nossa história
        </h2>
        <p className="mx-auto mt-6 max-w-5xl text-left text-base leading-relaxed text-[rgba(28,29,29,0.82)] lg:text-lg">
          Nós somos o Instituto de Pesquisa e Promoção da Saúde (IPPS), uma
          organização da sociedade civil sem fins lucrativos, fundada em 05 de
          fevereiro de 2002.
          <br />
          <br />
          Atuamos de forma técnica e social no desenvolvimento de ações e
          programas voltados à promoção da saúde, da cidadania e da qualidade
          de vida, abrangendo as áreas social, esportiva, cultural e de lazer.
          Somos uma instituição independente, pautada pela ética, pelo respeito
          à diversidade e pela não discriminação em todas as nossas atividades.
          <br />
          <br />
          Temos como foco o atendimento a pessoas com deficiência e suas
          famílias, especialmente aqueles em situação de vulnerabilidade social,
          em sua maioria na Zona Oeste. Nossas iniciativas visam promover a
          autonomia, ampliar o acesso a direitos e contribuir para a redução de
          barreiras atitudinais, arquitetônicas e sociais.
          <br />
          <br />
          Trabalhamos de forma contínua para fortalecer a inclusão e contribuir
          para a melhoria das condições de vida da população atendida.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-black/5">
        <Carousel
          showArrows
          infiniteLoop
          autoPlay
          showStatus={false}
          showThumbs={false}
          showIndicators={false}
          swipeable
          emulateTouch
          interval={4500}
          stopOnHover
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                aria-label={label}
                className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-2xl leading-none text-black shadow-md transition hover:bg-white"
              >
                ‹
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                aria-label={label}
                className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-3 text-2xl leading-none text-black shadow-md transition hover:bg-white"
              >
                ›
              </button>
            )
          }
        >
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="px-4 pb-2">
              <div className="grid gap-4 md:grid-cols-3">
                {slide.map((imagem, imageIndex) => (
                  <div
                    key={`${slideIndex}-${imageIndex}`}
                    className="overflow-hidden rounded-[1.5rem] shadow-sm ring-1 ring-black/5"
                  >
                    <img
                      src={imagem}
                      alt={`Fotografia da história do IPPS ${slideIndex + 1}-${imageIndex + 1}`}
                      className="h-[280px] w-full object-cover md:h-[420px]"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}