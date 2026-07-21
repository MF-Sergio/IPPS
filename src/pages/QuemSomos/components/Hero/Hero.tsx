import img from "../../../../assets/img/foto_hero_quem-somos.png";

export default function Hero() {
  return (
    <section className="container mx-auto">
      <div>
        <h1 className="hidden text-xl text-start !font-bold text-[var(--titulo)] sm:block">
          IPPS Social
        </h1>

        <div className="relative">
          <img
            src={img}
            alt="Imagem de uma criança segurando um globo terrestre e outras crianças ao fundo"
            className="h-[575px] w-full object-cover object-[50%_38%] sm:h-auto sm:object-contain sm:object-center"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.2)_55%,#FEF8F8_100%)] sm:hidden"
          />
        </div>
      </div>
    </section>
  );
}
