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
		texto: "",
	},
	{
		ano: "2025",
		texto: "",
	},
];

export default function NossaTrajetoria() {
	return (
		<section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
			<div className="text-center">
				<h2 className="text-3xl font-bold text-[var(--vermelho)] lg:text-4xl">
					Nossa Trajetória
				</h2>
			</div>

			<div className="relative mt-12">
				<div className="absolute left-11 top-0 h-full w-[1.8px] bg-[#c8c0c2]" />

				<div className="space-y-10 sm:space-y-12">
					{etapas.map((etapa) => (
						<article
							key={etapa.ano}
							className="grid items-start gap-4 sm:grid-cols-[84px_1fr] sm:gap-6"
						>
							<div className="relative flex items-start justify-start">
								<div className="relative z-10 inline-flex min-w-[84px] items-center justify-center rounded-xl bg-[#f1c8d6] px-4 py-3 text-lg font-bold text-[var(--vermelho)] shadow-sm sm:min-w-[88px]">
									{etapa.ano}
								</div>
							</div>

							<div className="pt-1 text-left">
								{etapa.texto ? (
									<p className="max-w-5xl text-base font-semibold leading-relaxed text-[rgba(28,29,29,0.88)] sm:text-lg">
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
