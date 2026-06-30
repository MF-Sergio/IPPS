import Caixa from "../Caixa/Caixa.jsx";
import {
  PersonWheelchair,
  Box2HeartFill,
  PeopleFill,
  ShieldCheck,
} from "react-bootstrap-icons";
import BlocoLayout from "../../../../layout/BlocoLayout.jsx";

export default function QuemSomos() {
  return (
    <BlocoLayout id="transparencia" titulo="Quem Somos">
      <h1 className="text-4xl text-black-700 font-bold mb-8 text-center ">
        Mais de 20 anos dedicados à inclusão social
      </h1>
      <p className="text-lg text-gray-700 mb-6 ">
        O IPPS é uma associação civil sem fins lucrativos, dedicada a promover a
        cidadania e o bem-estar de populações carentes, com um olhar especial
        para pessoas com deficiência e seus familiares. Atuamos nas áreas
        social, esportiva, cultural e de lazer, sempre com o compromisso de
        construir uma sociedade mais inclusiva e justa.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Caixa
          icone={<PersonWheelchair />}
          title="DESCRIÇÃO"
          descricao="Eliminamos barreiras arquitetônicas e atitudidinais para promover a inclusão plena."
        ></Caixa>
        <Caixa
          icone={<Box2HeartFill />}
          title="CIDADANIA"
          descricao="Desenvolvemos programas que promovem autonomia e direitos das pessoas com deficiência."
        ></Caixa>
        <Caixa
          icone={<PeopleFill />}
          title="COMUNIDADE"
          descricao="Atuamos junto a famílias em vulnerabilidade social, fortalecendo laços comunitários."
        ></Caixa>
        <Caixa
          icone={<ShieldCheck />}
          title="TRANSPARÊNCIA"
          descricao="Eliminamos barreiras arquitetônicas e atitudidinais para promover a inclusão plena."
        ></Caixa>
      </div>
    </BlocoLayout>
  );
}
