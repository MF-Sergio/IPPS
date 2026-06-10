import BlocoLayout from "../../../../layout/BlocoLayout.jsx";
import Caixa from "../Caixa/Caixa.jsx";
import {
  PersonWheelchair,
  Box2HeartFill,
  PeopleFill,
  ShieldCheck,
} from "react-bootstrap-icons";

export function NossosProjetos() {
  return (
    <BlocoLayout titulo={"Nossos Projetos"}>
      <h1>Transformando vidas através da ação</h1>
      <p>
        Conheça algumas das iniciativas que impactam diretamente a vida de
        milhares de pessoas.{" "}
      </p>
    </BlocoLayout>
  );
}

export default NossosProjetos;
