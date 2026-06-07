import Caixa from "../Caixa/Caixa.jsx";
import {
  PersonWheelchair,
  Box2HeartFill,
  PeopleFill,
  ShieldCheck,
} from "react-bootstrap-icons";

export default function QuemSomos() {
  return (
    <div className="bg-[var(--fundo)] py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center titulo">
          Quem Somos
        </h2>
        <h3 className="text-xl text-black-700 font-bold mb-8 text-center ">
          Mais de 20 anos dedicados à inclusão social
        </h3>
        <p className="text-lg text-gray-700 mb-6">
          O IPPS é uma associação sem fins lucrativos que promove cidadania e
          bem-estar, com foco em pessoas com deficiência e suas famílias,
          atuando nas áreas social, esportiva, cultural e de lazer.
        </p>
      </div>
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
    </div>
  );
}
