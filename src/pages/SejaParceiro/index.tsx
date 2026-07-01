import Hero from "./components/Hero/Hero";
import Formulario from "../../components/Formulario/Formulario";
import { CardComIcone } from "../../components/CardComIcone/CardComIcone";
import { Trophy } from "react-bootstrap-icons";
import { GraphUpArrow } from "react-bootstrap-icons";
import { People } from "react-bootstrap-icons";
import { Eye } from "react-bootstrap-icons";
import { Heart } from "react-bootstrap-icons";
import { Bullseye } from "react-bootstrap-icons";

export default function SejaParceiro() {
  return (
    <div className="bg-[var(--fundo)]">
      <Hero />
      <h1 className=" text-3xl lg:text-[48px] leading-tight lg:leading-[70px] text-[var(--vermelho)] uppercase text-center">
        BENEFÍCIOS DA PARCERIA
      </h1>
      <h2 className="text-lg lg:text-xl leading-relaxed lg:leading-[39px] text-[rgba(28,29,29,0.75)] text-center">
        Ao tornar-se parceiro, sua organização ganha muito mais do que
        visibilidade
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mb-8 lg:mb-16 lg:mt-16 justify-items-center">
        <CardComIcone
          icone={<Trophy />}
          title="Reconhecimento Institucional"
          descricao="Sua marca destacada em nossos canais de comunicação e eventos"
          iconBgColor="bg-[var(--vermelho)]"
          iconColor="text-[var(--fundo)]"
        ></CardComIcone>
        <CardComIcone
          icone={<GraphUpArrow />}
          title="Relatórios de Impacto"
          descricao="Acompanhe mensalmente os resultados e o alcance dos projetos"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
        ></CardComIcone>
        <CardComIcone
          icone={<People />}
          title="Networking Qualificado"
          descricao="Conexões com outras empresas e organizações engajadas socialmente"
          iconBgColor="bg-[var(--icones)]"
          iconColor="text-[var(--fundo)]"
        ></CardComIcone>
        <CardComIcone
          icone={<Eye />}
          title="Visibilidade"
          descricao="Exposição positiva da marca associada a causas sociais relevantes"
          iconBgColor="bg-[var(--vermelho)]"
          iconColor="text-[var(--fundo)]"
        ></CardComIcone>
        <CardComIcone
          icone={<Heart />}
          title="Engajamento de Equipe"
          descricao="Oportunidades de voluntariado corporativo para seus colaboradores"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
        ></CardComIcone>
        <CardComIcone
          icone={<Bullseye />}
          title="Alinhamento ESG"
          descricao="Fortaleça as práticas de responsabilidade social da sua empresa"
          iconBgColor="bg-[var(--icones)]"
          iconColor="text-[var(--fundo)]"
        ></CardComIcone>
      </div>
      <section className="relative left-1/2 -translate-x-1/2 w-screen  bg-gradient-to-t from-[#F2D9B5] to-[#3E6377]">
        <Formulario></Formulario>
      </section>
    </div>
  );
}
