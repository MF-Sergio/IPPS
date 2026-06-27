import Hero from "./components/Hero/Hero";
import Botao from "../../components/Botao/Botao";
import TrabalheConoscoImg1 from "../../assets/img/trabalhe_conosco_img1.png";
import TrabalheConoscoImg2 from "../../assets/img/trabalhe_conosco_img2.png";
import TrabalheConoscoImg3 from "../../assets/img/trabalhe_conosco_img3.png";
import { CardComIcone } from "../../components/CardComIcone/CardComIcone";
import { Envelope } from "react-bootstrap-icons";
import { Telephone } from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";
import { Clock } from "react-bootstrap-icons";
import Formulario from "../../components/Formulario/Formulario";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function Contato() {
  return (
    <div className="bg-[var(--fundo)]">
      <Hero />
      <h1 className="font-serif font-black text-3xl lg:text-[48px] leading-tight lg:leading-[70px]  uppercase text-center py-8">
        Informações de <span className="text-[var(--vermelho)]">Contato</span>
      </h1>
      <p className="text-2xl leading-relaxed ">
        Múltiplos canais para você entrar em contato conosco
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8 lg:mb-16 lg:mt-16 ">
        <CardComIcone
          icone={<Envelope />}
          title="E-MAIL"
          descricao="ippromocaodasaude@gmail.com"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
          tipoFlex="flex-row"
          margemCaixaTexto="ml-6"
        ></CardComIcone>
        <CardComIcone
          icone={<Telephone />}
          title="Telefone"
          descricao="+55 (21) 98585-6380"
          iconBgColor="bg-[var(--vermelho)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
          tipoFlex="flex-row"
          margemCaixaTexto="ml-6"
        ></CardComIcone>
        <CardComIcone
          icone={<GeoAlt />}
          title="Endereço"
          descricao="Av. de Santa Cruz, 1631 - Realengo, Rio de Janeiro - RJ, 21710-255"
          iconBgColor="bg-[var(--verde)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
          tipoFlex="flex-row"
          margemCaixaTexto="ml-6"
        ></CardComIcone>
        <CardComIcone
          icone={<Clock />}
          title="Endereço"
          descricao="Av. de Santa Cruz, 1631 - Realengo, Rio de Janeiro - RJ, 21710-255"
          iconBgColor="bg-[var(--vermelho)]"
          iconColor="text-[var(--fundo)]"
          fontColor="text-[rgba(28,29,29,0.75)]"
          tipoFlex="flex-row"
          margemCaixaTexto="ml-6"
        ></CardComIcone>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8 lg:mb-16 lg:mt-16 items-center">
        <Formulario />
        <div className="flex flex-col items-center ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d892.8274671050976!2d-43.43768570351391!3d-22.878044646745312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdf7d1957ad17%3A0x50d02064a65075e5!2sAv.%20de%20Santa%20Cruz%2C%201631%20-%20Realengo%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2021710-255!5e0!3m2!1spt-BR!2sbr!4v1733512073214!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <Botao
            texto="Fale Conosco"
            className="hover:bg-[#1b5570]"
            icone={faWhatsapp}
          />
        </div>
      </div>
    </div>
  );
}
