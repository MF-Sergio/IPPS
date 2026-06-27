import contatoImg from "../../../../assets/img/foto1.jpg";
export default function Hero() {
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen h-[560px] lg:h-[739px] overflow-hidden  bg-[var(--fundo)]">
      <img
        src={contatoImg}
        alt="Grupo de pessoas do IPPS"
        className="absolute inset-0 w-full h-full object-cover "
      />

      <div className="absolute inset-0  bg-[rgba(164,2,1,0.45)] " />

      <div className="absolute top-50  left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1104px] text-[var(--branco)]">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="font-serif font-black text-3xl lg:text-[48px] leading-tight lg:leading-[70px]  uppercase text-left">
            Entre em <span className="text-[#FFD700]">contato</span>
          </h1>

          <p className="text-2xl leading-relaxed ">
            Estamos prontos para ouvir você. Entre em contato conosco e descubra
            como podemos trabalhar juntos.
          </p>
        </div>
      </div>
    </section>
  );
}
