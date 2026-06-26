import Kpi from "../Kpi/Kpi";
import BlocoLayout from "../../../../layout/BlocoLayout.jsx";

export function NossoImpacto() {
  return (
    <BlocoLayout id="impacto" titulo={"Nosso Impacto"}>
      <div className="bg-[var(--vermelho)] flex flex-col items-center justify-center content-center p-3 rounded-lg shadow-md">
        <h1 className="text-4xl text-[var(--branco)]  mt-8">
          Números que contam história
        </h1>
        <p className="text-base text-[var(--branco)]">
          Cada número representa uma vida transformada, uma barreira superada,
          uma família fortalecida.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <Kpi title={"Pessoas atendidas"} value={"95.000+"}></Kpi>
          <Kpi title={"Anos de atuação social"} value={"20"}></Kpi>
          <Kpi title={"Projetos realizados no total"} value={"2+"}></Kpi>
          <Kpi title={"Comunidades impactadas"} value={"10"}></Kpi>
        </div>
      </div>
    </BlocoLayout>
  );
}

export default NossoImpacto;
