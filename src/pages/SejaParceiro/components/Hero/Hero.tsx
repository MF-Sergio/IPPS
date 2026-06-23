import sejaParceiroHeroImg from "../../../../assets/img/seja-parceiro-hero.jpg";

export default function Hero() {
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen h-[560px] lg:h-[739px] overflow-hidden rounded-b-[20px] bg-[var(--fundo)]">
      <img
        src={sejaParceiroHeroImg}
        alt="Grupo de pessoas em atividade comunitária no IPPS"
        className="absolute inset-0 w-full h-full object-cover rounded-b-[20px]"
      />

      <div className="absolute inset-0 rounded-b-[20px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_3.22%,rgba(0,0,0,0.2)_45.47%,#fef8f8_87.72%)]" />

      <div className="absolute bottom-6 lg:bottom-[24px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1104px] bg-white rounded-2xl border border-[#f3f4f6] shadow-[0_30px_30px_rgba(0,0,0,0.03)] px-6 sm:px-12 lg:px-[65px] py-6 lg:pt-6 lg:pb-5">
        <div className="flex flex-col gap-3 items-start">
          <div className="flex items-center gap-4">
            <div
              className="w-[7px] h-16 shrink-0 rounded-full"
              style={{
                background:
                  "linear-gradient(180deg, var(--vermelho) 0%, var(--verde) 100%)",
              }}
            />
            <h1 className="font-serif font-black text-3xl lg:text-[48px] leading-tight lg:leading-[70px] text-[var(--vermelho)] uppercase text-left">
              Seja parceiro
            </h1>
          </div>
          <p className="text-lg lg:text-2xl leading-relaxed lg:leading-[39px] text-[rgba(28,29,29,0.75)] text-left">
            Juntos, ampliamos o impacto e transformamos vidas. Torne-se um
            parceiro do IPPS e faça parte de uma rede comprometida com inclusão,
            cidadania e autonomia.
          </p>
        </div>
      </div>
    </section>
  );
}
