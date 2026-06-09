import Kpi from "../Kpi/Kpi";

export function NossoImpacto() {
  return (
    <div className="bg-[var(--fundo)] py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center titulo">
          Nosso Impacto
        </h2>
        <div className="bg-[var(--vermelho)] flex flex-col items-center justify-center content-center p-6 -100 rounded-lg  ">
          <h1 className="text-4xl text-[var(--branco)]">
            Números que contam história
          </h1>
          <p className="text-base text-[var(--branco)]">
            Cada número representa uma vida transformada, uma barreira superada,
            uma família fortalecida.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Kpi title={"Pessoas atendidas"} value={"95.000+"}></Kpi>
            <Kpi title={"Anos de atuação social"} value={"20"}></Kpi>
            <Kpi title={"Projetos realizados no total"} value={"2+"}></Kpi>
            <Kpi title={"Comunidades impactadas"} value={"10"}></Kpi>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NossoImpacto;
