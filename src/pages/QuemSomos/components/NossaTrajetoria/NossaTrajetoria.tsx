const etapas = [
  {
    ano: "2002",
    texto:
      "Fundado em 05 de fevereiro de 2002 por Ana Paula Costa Gissoni e outros colaboradores.",
  },
  {
    ano: "2004",
    texto:
      "Recebe o certificado de inscrição do conselho Municipal da Assistência Social do RJ e o IPPS passa a ter a meta de 100 atendimentos.",
  },
  {
    ano: "2005",
    texto:
      "Recebemos o certificado de inscrição no Conselho Municipal dos Direitos da Criança e do Adolescente.",
  },
  {
    ano: "2022",
    texto:
      "O IPPS mantém convênio com a Prefeitura do Rio de Janeiro, por meio da Secretaria Municipal da Pessoa com Deficiência (SMPD), com capacidade ampliada para 200 atendimentos.",
  },
  {
    ano: "2023",
    texto:
      "O IPPS participou do programa Sesc Voe, recebendo o Selo Coruja, voltado à formação e aceleração de organizações sociais no Rio de Janeiro.",
  },
  {
    ano: "2024",
    texto:
      "Continuamos expandindo nossos serviços e fortalecendo parcerias estratégicas para ampliar nosso impacto social.",
  },
  {
    ano: "2025",
    texto:
      "Novos programas de inclusão e desenvolvimento comunitário são implementados, beneficiando ainda mais famílias.",
  },
];

export default function NossaTrajetoria() {
  return (
    <section className="mx-auto pt-16 max-w-6xl px-[11px] sm:px-6 lg:px-8 bg-[#fbf5f5] sm:bg-inherit">
      <div className="text-center">
        <h2 className="text-3xl font-bold uppercase tracking-wide text-[var(--vermelho)] sm:text-4xl">
          Nossa Trajetória
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#1C1D1D] sm:text-lg">
          Décadas de dedicação transformando vidas e construindo um futuro mais
          inclusivo
        </p>
      </div>

      <div className="relative mt-12 before:absolute before:left-1/2 before:top-0 before:h-full before:w-[1.8px] before:-translate-x-1/2 before:bg-[#c8c0c2] lg:before:left-11 lg:before:translate-x-0">
        <div className="space-y-8 lg:space-y-12">
          {etapas.map((etapa) => (
            <article
              key={etapa.ano}
              className="relative z-10 mx-auto mb-[64px] w-full max-w-[353px] min-h-[224px] rounded-2xl border-t-[1.2px] border-t-[#F3F4F6] bg-white px-3 py-8 shadow-[0_15px_40px_0_rgba(0,0,0,0.08)] lg:mx-0 lg:grid lg:w-full lg:max-w-none lg:min-h-0 lg:grid-cols-[84px_1fr] lg:gap-6 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none"
            >
              <div className="relative mb-4 flex items-start justify-start lg:mb-0 lg:justify-start">
                <div className="relative z-10 inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#A9171A] bg-[#EFC8D7] px-[10.27px] text-2xl font-black text-[var(--vermelho)] lg:h-auto lg:w-auto lg:min-w-[88px] lg:rounded-xl lg:border-0 lg:bg-none lg:bg-[#f1c8d6] lg:px-4 lg:py-3 lg:shadow-sm">
                  {etapa.ano}
                </div>
              </div>

              <div className="pt-0 text-left lg:pt-1">
                {etapa.texto ? (
                  <p className="max-w-5xl text-base leading-relaxed text-[#1C1D1D] sm:text-lg sm:font-semibold">
                    {etapa.texto}
                  </p>
                ) : (
                  <div className="min-h-[2.75rem]" />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
