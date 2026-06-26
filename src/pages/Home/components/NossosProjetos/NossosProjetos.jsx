import BlocoLayout from "../../../../layout/BlocoLayout.jsx";
import Caixa from "../Caixa/Caixa.jsx";
import {
  PersonWheelchair,
  Box2HeartFill,
  PeopleFill,
  ShieldCheck,
} from "react-bootstrap-icons";
import CardComImagem from "../../../../components/CardComImagem/CardComImagem.jsx";

export function NossosProjetos() {
  return (
    <BlocoLayout id="projetos" titulo={"Nossos Projetos"}>
      <h1>Transformando vidas através da ação</h1>
      <p>
        Conheça algumas das iniciativas que impactam diretamente a vida de
        milhares de pessoas.{" "}
      </p>
      <br />
      <div className="flex flex-wrap gap-6 justify-center">
        <CardComImagem
          imagemUrl="img_vivendo_acolhendo.jpg"
          titulo="Vivendo e Acolhendo"
          descricao="Serviço de Proteção Social Especial voltado a Pessoas com Deficiência e suas famílias, promovendo inclusão social e qualidade de vida por meio de atendimento integral, atividades coletivas e suporte humanizado."
        ></CardComImagem>
        <CardComImagem
          imagemUrl="img_saude_integral.jpg"
          titulo="Saúde Integral"
          descricao="Espaço que integra ensino, pesquisa e atendimento à comunidade, promovendo saúde, autonomia e qualidade de vida  através de ações desenvolvidas em parceria com a Clínica Escola Castelo Branco."
        ></CardComImagem>
      </div>
    </BlocoLayout>
  );
}

export default NossosProjetos;
