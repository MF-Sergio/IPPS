import img from "../../../../assets/img/foto_hero_quem-somos.png";

export default function Hero() {
  return (
    <section className="container mx-auto">
      <div>
        <h1 className="text-xl text-start !font-bold text-[var(--titulo)]">
          IPPS Social
        </h1>
        <img src={img} alt="Imagem de uma criança segurando um globo terrestre e outras crianças ao fundo" className="w-full h-auto" />
      </div>
    </section>
  )
}