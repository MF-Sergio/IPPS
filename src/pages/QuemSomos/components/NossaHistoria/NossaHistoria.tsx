import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import foto1 from "../../../../assets/img/image_atividades IPPS 1.png";
import foto2 from "../../../../assets/img/image_atividades IPPS 2.png";
import foto3 from "../../../../assets/img/image_atividades IPPS 3.png";
import foto4 from "../../../../assets/img/foto4.jpg";

const slides = [
  [foto1, foto2, foto3],
  [foto2, foto3, foto4],
  [foto3, foto4, foto1],
];

const fotosMobile = [
  {
    src: foto1,
    alt: "Atividade coletiva realizada pelo IPPS",
    className: "col-span-2 aspect-auto",
  },
  {
    src: foto2,
    alt: "Participantes de uma atividade do IPPS",
    className: "col-span-2 aspect-auto",
  },
  {
    src: foto3,
    alt: "Projeto social desenvolvido pelo IPPS",
    className: "col-span-2 aspect-auto",
  },
];

export default function NossaHistoria() {
  return (
    <section className="mx-auto max-w-6xl">
      {/* Versão mobile: abaixo de 640px */}
      <div className="px-4 pb-10 sm:hidden">
        <h2 className="text-center text-3xl !font-bold uppercase text-[var(--vermelho)]">
          Conheça o IPPS
        </h2>

        <div className="text-start text-lg font-normal mt-6 space-y-5 leading-6 text-black font-(family-name:--sans-alt)">
          <p>
            Somos o Instituto de Pesquisa e Promoção da Saúde (IPPS), uma
            organização sem fins lucrativos fundada em 2002.
          </p>

          <p>
            Atuamos com projetos que promovem saúde, cidadania e qualidade de
            vida, por meio de iniciativas sociais, esportivas, culturais e de
            lazer.
          </p>

          <p>
            Nosso foco está no atendimento a pessoas com deficiência e suas
            famílias, especialmente em contextos de vulnerabilidade social.
          </p>

          <div>
            <p>Trabalhamos para:</p>

            <ul className="mt-1 list-disc space-y-1 pl-6">
              <li>ampliar o acesso a direitos;</li>
              <li>fortalecer a autonomia;</li>
              <li>reduzir barreiras sociais, físicas e atitudinais.</li>
            </ul>
          </div>

          <p>
            Acreditamos na inclusão, no respeito à diversidade e na
            transformação social.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {fotosMobile.map((foto) => (
            <div
              key={foto.src}
              className={`overflow-hidden rounded-2xl ${foto.className}`}
            >
              <img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Versão desktop atual: a partir de 640px */}
      <div className="hidden px-8 sm:mt-16 sm:block">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[var(--vermelho)]">
            Nossa história
          </h2>

          <p className="mx-auto mt-6 max-w-5xl text-left text-lg leading-relaxed text-[rgba(28,29,29,0.82)]">
            Nós somos o Instituto de Pesquisa e Promoção da Saúde (IPPS), uma
            organização da sociedade civil sem fins lucrativos, fundada em 05 de
            fevereiro de 2002.
            <br />
            <br />
            Atuamos de forma técnica e social no desenvolvimento de ações e
            programas voltados à promoção da saúde, da cidadania e da qualidade
            de vida, abrangendo as áreas social, esportiva, cultural e de lazer.
            Somos uma instituição independente, pautada pela ética, pelo
            respeito à diversidade e pela não discriminação em todas as nossas
            atividades.
            <br />
            <br />
            Temos como foco o atendimento a pessoas com deficiência e suas
            famílias, especialmente aqueles em situação de vulnerabilidade
            social, em sua maioria na Zona Oeste. Nossas iniciativas visam
            promover a autonomia, ampliar o acesso a direitos e contribuir para
            a redução de barreiras atitudinais, arquitetônicas e sociais.
            <br />
            <br />
            Trabalhamos de forma contínua para fortalecer a inclusão e
            contribuir para a melhoria das condições de vida da população
            atendida.
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
                <div className="grid grid-cols-3 gap-4">
                  {slide.map((imagem, imageIndex) => (
                    <div
                      key={`${slideIndex}-${imageIndex}`}
                      className="overflow-hidden rounded-[1.5rem] shadow-sm ring-1 ring-black/5"
                    >
                      <img
                        src={imagem}
                        alt={`Fotografia da história do IPPS ${
                          slideIndex + 1
                        }-${imageIndex + 1}`}
                        className="h-[420px] w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
