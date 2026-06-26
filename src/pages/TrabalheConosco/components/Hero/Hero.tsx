import trabalheConoscoHeroImg from "../../../../assets/img/trabalhe-conosco.png";
import { CardComIcone } from "../../../../components/CardComIcone/CardComIcone";
import { Trophy } from "react-bootstrap-icons";
import { People } from "react-bootstrap-icons";
import { Heart } from "react-bootstrap-icons";
export default function Hero() {
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen h-[560px] lg:h-[739px] overflow-hidden rounded-b-[20px] bg-[var(--fundo)]">
      <img
        src={trabalheConoscoHeroImg}
        alt="Grupo de pessoas do IPPS"
        className="absolute inset-0 w-full h-full object-cover rounded-b-[20px]"
      />

      <div className="absolute inset-0 rounded-b-[20px] bg-[linear-gradient(180deg,rgba(33,101,135,0.9)_0.0%,rgba(33,101,135,0.7)_45.47%,#216587_87.72%)] " />

      <div className="absolute top-50  left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-[1104px] text-[var(--branco)]">
        <div className="flex flex-col gap-3 items-center">
          <h1 className="font-serif font-black text-3xl lg:text-[48px] leading-tight lg:leading-[70px]  uppercase text-left">
            Faça parte da nossa <span className="text-[#FFD700]">família</span>
          </h1>

          <p className="text-2xl leading-relaxed ">
            Junte-se a nós na missão de transformar vidas através da inclusão,
            cidadania e promoção da saúde.
          </p>
          <p className="text-xl leading-relaxed ">
            Estamos em busca de pessoas apaixonadas por fazer a diferença e
            comprometidas com o impacto social.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8 lg:mb-16 lg:mt-16 justify-items-center  ">
          <CardComIcone
            icone={<Heart />}
            title="Propósito"
            descricao="Trabalhe com significado em uma organização que transforma vidas diariamente"
            iconBgColor="bg-[var(--vermelho)]"
            iconColor="text-[var(--fundo)]"
            bgColor="bg-[#3D738B]"
            fontColor="text-[var(--branco)]"
          ></CardComIcone>
          <CardComIcone
            icone={<Trophy />}
            title="Crescimento"
            descricao="Desenvolva suas habilidades e cresça profissionalmente conosco"
            iconBgColor="bg-[var(--vermelho)]"
            iconColor="text-[var(--fundo)]"
            bgColor="bg-[#3D738B]"
            fontColor="text-[var(--branco)]"
          ></CardComIcone>
          <CardComIcone
            icone={<Heart />}
            title="Propósito"
            descricao="Trabalhe com significado em uma organização que transforma vidas diariamente"
            iconBgColor="bg-[var(--vermelho)]"
            iconColor="text-[var(--fundo)]"
            bgColor="bg-[#3D738B]"
            fontColor="text-[var(--branco)]"
          ></CardComIcone>
        </div>
      </div>
    </section>
  );
}
