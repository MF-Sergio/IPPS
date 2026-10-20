import BlocoLayout from "../../../../layout/BlocoLayout.jsx";
import Caixa from "../Caixa/Caixa.jsx";
import {
  PersonWheelchair,
  Box2HeartFill,
  PeopleFill,
  ShieldCheck,
} from "react-bootstrap-icons";
import CardComImagem from "../../../../components/CardComImagem/CardComImagem.jsx";
import imgVivendoAcolhendo from "../../../../assets/img/img_vivendo_acolhendo.webp";
import imgSaudeIntegral from "../../../../assets/img/img_saude_integral.webp";
import imgVivendoAcolhendo400 from "../../../../assets/img/img_vivendo_acolhendo-400.webp";
import imgSaudeIntegral400 from "../../../../assets/img/img_saude_integral-400.webp";

export function NossosProjetos() {
  return (
    <BlocoLayout id="projetos" titulo={"Nossos Projetos"}>
      <h2 className="text-4xl">Transformando vidas através da ação</h2>
      <p className="text-xl mx-5 lg:mx-auto">
        Conheça algumas das iniciativas que impactam diretamente a vida de
        milhares de pessoas.{" "}
      </p>
      <div className="flex flex-wrap gap-6 justify-center mt-10 mx-5 lg:mx-auto">
        <CardComImagem
          imagem={imgVivendoAcolhendo}
          srcSet={`${imgVivendoAcolhendo400} 400w, ${imgVivendoAcolhendo} 800w`}
          alt="Atividade do projeto Vivendo e Acolhendo com pessoas com deficiência"
          titulo="Vivendo e Acolhendo"
          descricao="Serviço de Proteção Social Especial voltado a Pessoas com Deficiência e suas famílias, promovendo inclusão social e qualidade de vida por meio de atendimento integral, atividades coletivas e suporte humanizado."
        ></CardComImagem>
        <CardComImagem
          imagem={imgSaudeIntegral}
          srcSet={`${imgSaudeIntegral400} 400w, ${imgSaudeIntegral} 800w`}
          alt="Atendimento do projeto Saúde Integral"
          titulo="Saúde Integral"
          descricao="Espaço que integra ensino, pesquisa e atendimento à comunidade, promovendo saúde, autonomia e qualidade de vida  através de ações desenvolvidas em parceria com a Clínica Escola Castelo Branco."
        ></CardComImagem>
      </div>
    </BlocoLayout>
  );
}

export default NossosProjetos;
