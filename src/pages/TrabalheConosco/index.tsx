import Hero from "./components/Hero/Hero";
import TrabalheConoscoImg1 from "../../assets/img/trabalhe_conosco_img1.png";
import TrabalheConoscoImg2 from "../../assets/img/trabalhe_conosco_img2.png";
import TrabalheConoscoImg3 from "../../assets/img/trabalhe_conosco_img3.png";
import { CardComIcone } from "../../components/CardComIcone/CardComIcone";
import { Lightbulb } from "react-bootstrap-icons";
import { Bullseye } from "react-bootstrap-icons";
import { UniversalAccess } from "react-bootstrap-icons";
import { Stars } from "react-bootstrap-icons";
import { Book } from "react-bootstrap-icons";
import { CupHotFill } from "react-bootstrap-icons";
import Formulario from "../../components/Formulario/Formulario";

export default function TrabalheConosco() {
  return (
    <div className="bg-[var(--fundo)]">
      <Hero />
      <h1 className="font-serif font-black text-3xl lg:text-[48px] leading-tight lg:leading-[70px]  uppercase text-center py-8">
        Conheça nossa <span className="text-[var(--vermelho)]">Ambiente</span>
      </h1>
      <p className="text-2xl leading-relaxed ">
        Um espaço acolhedor onde cada dia fazemos a diferença
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8 lg:mb-16 lg:mt-16 justify-items-center  ">
        <img
          className="rounded-[16px]"
          src={TrabalheConoscoImg1}
          alt="Reunião do IPPS"
        />
        <img
          className="rounded-[16px]"
          src={TrabalheConoscoImg2}
          alt="Crianças do IPPS fazendo atividades"
        />
        <img
          className="rounded-[16px]"
          src={TrabalheConoscoImg3}
          alt="Crianças do IPPS fazendo atividades 2"
        />
      </div>
      <h1 className="font-serif font-black text-3xl lg:text-[48px] leading-tight lg:leading-[70px]  uppercase text-center py-8">
        Por Que Trabalhar Conosco?
      </h1>
      <p className="text-2xl leading-relaxed ">
        Oferecemos mais do que um emprego, oferecemos uma missão com propósito
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8 lg:mb-16 lg:mt-16 justify-items-center">
        <CardComIcone
          icone={<Lightbulb />}
          title="Reconhecimento Institucional"
          descricao="Sua marca destacada em nossos canais de comunicação e eventos"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
        ></CardComIcone>
        <CardComIcone
          icone={<Bullseye />}
          title="Impacto Real"
          descricao="Veja diretamente o resultado do seu trabalho na vida de centenas de pessoas"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
        ></CardComIcone>
        <CardComIcone
          icone={<UniversalAccess />}
          title="Cultura Colaborativa"
          descricao="Trabalhe em equipe com profissionais dedicados e apaixonados pela causa social"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
        ></CardComIcone>
        <CardComIcone
          icone={<Stars />}
          title="Reconhecimento"
          descricao="Valorizamos o esforço e dedicação de cada membro da nossa equipe"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
        ></CardComIcone>
        <CardComIcone
          icone={<Book />}
          title="Desenvolvimento Contínuo"
          descricao="Acesso a treinamentos e oportunidades de capacitação profissional"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
        ></CardComIcone>
        <CardComIcone
          icone={<CupHotFill />}
          title="Ambiente Acolhedor"
          descricao="Espaço de trabalho inclusivo, respeitoso e que valoriza o bem-estar"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
        ></CardComIcone>
      </div>
      <Formulario />
    </div>
  );
}
