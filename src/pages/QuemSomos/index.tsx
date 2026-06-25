import { PeopleFill, ShieldCheck, HeartFill } from "react-bootstrap-icons";
import missaoImg from "../../assets/img/missao.jpeg";
import visaoImg from "../../assets/img/visao.jpeg";
import valoresImg from "../../assets/img/valores.jpeg";
import propositoImg from "../../assets/img/proposito.jpeg";

const pilares = [
	{
		titulo: "Missão",
		descricao:
			"Promover inclusão, autonomia e dignidade por meio de ações sociais, esportivas, culturais e educativas.",
		imagem: missaoImg,
		icone: <HeartFill size={28} />,
	},
	{
		titulo: "Visão",
		descricao:
			"Ser referência em cuidado comunitário e desenvolvimento humano para pessoas com deficiência e suas famílias.",
		imagem: visaoImg,
		icone: <ShieldCheck size={28} />,
	},
	{
		titulo: "Valores",
		descricao:
			"Atuar com ética, acolhimento, transparência, respeito e compromisso com a transformação social.",
		imagem: valoresImg,
		icone: <PeopleFill size={28} />,
	},
];

const marcos = [
	{
		ano: "2002",
		titulo: "Fundação do IPPS",
		descricao:
			"Início da atuação institucional com foco em promoção da saúde e inclusão social.",
	},
	{
		ano: "2010",
		titulo: "Expansão de iniciativas",
		descricao:
			"Ampliação das frentes de atendimento e fortalecimento do vínculo com a comunidade.",
	},
	{
		ano: "2020",
		titulo: "Resposta a novas demandas",
		descricao:
			"Ajuste dos projetos para continuar acolhendo famílias e ampliando o alcance social.",
	},
	{
		ano: "2024",
		titulo: "Base para o futuro",
		descricao:
			"Estruturação de novos caminhos para crescer com mais impacto, transparência e parceria.",
	},
];

export default function QuemSomos() {
	return (
		<div className="bg-[var(--fundo)] pb-16">
			<section className="relative overflow-hidden rounded-b-[2rem] bg-gradient-to-r from-[#f6d9de] via-[#fef8f8] to-[#dfeef4] px-6 py-12 lg:px-12 lg:py-16">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(169,23,26,0.08),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(33,101,135,0.12),_transparent_28%)]" />
				<div className="relative mx-auto max-w-5xl text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--verde)]">
						Instituto de Pesquisa e Promoção da Saúde
					</p>
					<h1 className="mt-4 text-4xl font-bold text-[var(--vermelho)] lg:text-6xl">
						Quem somos
					</h1>
					<p className="mx-auto mt-5 max-w-3xl text-base text-[rgba(28,29,29,0.82)] lg:text-lg">
						O IPPS atua desde 2002 promovendo inclusão, cidadania e autonomia
						para pessoas com deficiência e suas famílias, com projetos que
						conectam saúde, convivência e desenvolvimento social.
					</p>

					<div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
						<a
							href="/"
							className="inline-flex min-w-[220px] items-center justify-center rounded-lg bg-[var(--verde)] px-5 py-2 font-semibold text-white transition-colors hover:bg-[#1b5570]"
						>
							Conheça nossos projetos
						</a>
						<a
							href="#nossa-historia"
							className="inline-flex min-w-[220px] items-center justify-center rounded-lg border border-[var(--verde)] px-5 py-2 font-semibold text-[var(--verde)] transition-colors hover:bg-[var(--verde)] hover:text-white"
						>
							Ver nossa história
						</a>
					</div>
				</div>
			</section>

			<section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
					<div className="space-y-5 text-left">
						<p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--verde)]">
							Nossa atuação
						</p>
						<h2 className="text-3xl font-bold text-[var(--vermelho)] lg:text-4xl">
							Uma base para explicar o IPPS de forma clara e objetiva
						</h2>
						<p className="text-base text-[rgba(28,29,29,0.82)] lg:text-lg">
							Esta página começa com os elementos essenciais da instituição:
							quem somos, o que defendemos e como traduzimos isso em ações.
							Ela já nasce pronta para receber novas seções, depoimentos,
							resultados e conteúdos editoriais sem quebrar a estrutura.
						</p>
						<div className="grid gap-4 sm:grid-cols-3">
							<article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
								<p className="text-3xl font-bold text-[var(--vermelho)]">20+</p>
								<p className="mt-2 text-sm text-[rgba(28,29,29,0.75)]">
									Anos de atuação social contínua.
								</p>
							</article>
							<article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
								<p className="text-3xl font-bold text-[var(--verde)]">3</p>
								<p className="mt-2 text-sm text-[rgba(28,29,29,0.75)]">
									Frentes centrais: inclusão, cuidado e cidadania.
								</p>
							</article>
							<article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
								<p className="text-3xl font-bold text-[var(--icones)]">1</p>
								<p className="mt-2 text-sm text-[rgba(28,29,29,0.75)]">
									Instituição preparada para crescer com mais impacto.
								</p>
							</article>
						</div>
					</div>

					<div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-lg ring-1 ring-black/5">
						<img
							src={propositoImg}
							alt="Imagem de propósito institucional do IPPS"
							className="h-full w-full rounded-[1.5rem] object-cover"
						/>
					</div>
				</div>
			</section>

			<section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--verde)]">
						Pilares institucionais
					</p>
					<h2 className="mt-3 text-3xl font-bold text-[var(--vermelho)] lg:text-4xl">
						O que orienta cada decisão do IPPS
					</h2>
				</div>

				<div className="mt-10 grid gap-6 lg:grid-cols-3">
					{pilares.map((pilar) => (
						<article
							key={pilar.titulo}
							className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-black/5"
						>
							<div className="h-56 w-full overflow-hidden">
								<img
									src={pilar.imagem}
									alt={pilar.titulo}
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="space-y-4 p-6 text-left">
								<div className="inline-flex items-center justify-center rounded-2xl bg-[rgba(169,23,26,0.08)] p-3 text-[var(--vermelho)]">
									{pilar.icone}
								</div>
								<h3 className="text-2xl font-bold text-[var(--vermelho)]">
									{pilar.titulo}
								</h3>
								<p className="text-base text-[rgba(28,29,29,0.8)]">
									{pilar.descricao}
								</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section
				id="nossa-historia"
				className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8"
			>
				<div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
					<div className="space-y-4 text-left lg:sticky lg:top-8">
						<p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--verde)]">
							Nossa história
						</p>
						<h2 className="text-3xl font-bold text-[var(--vermelho)] lg:text-4xl">
							Uma trajetória construída com pessoas, escuta e compromisso
						</h2>
						<p className="text-base text-[rgba(28,29,29,0.82)] lg:text-lg">
							A história do IPPS pode ser organizada em marcos para facilitar a
							leitura e abrir espaço para o detalhamento futuro de cada fase.
							Esta estrutura já deixa o conteúdo preparado para virar linha do
							tempo, cards ou blocos interativos.
						</p>
					</div>

					<div className="space-y-4">
						{marcos.map((marco) => (
							<article
								key={marco.ano}
								className="grid gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:grid-cols-[auto_1fr] sm:items-start"
							>
								<div className="inline-flex h-16 min-w-16 items-center justify-center rounded-2xl bg-[rgba(33,101,135,0.1)] px-4 text-xl font-bold text-[var(--verde)]">
									{marco.ano}
								</div>
								<div className="text-left">
									<h3 className="text-xl font-bold text-[var(--vermelho)]">
										{marco.titulo}
									</h3>
									<p className="mt-2 text-base text-[rgba(28,29,29,0.8)]">
										{marco.descricao}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
				<div className="grid gap-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,_#a9171a,_#d12d30_55%,_#216587)] p-8 text-white lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
					<div className="text-left">
						<p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
							Próximo passo
						</p>
						<h2 className="mt-3 text-3xl font-bold lg:text-4xl">
							Quer apoiar uma instituição com impacto real?
						</h2>
						<p className="mt-4 max-w-2xl text-base text-white/90 lg:text-lg">
							A base desta página já deixa o caminho aberto para incluir novos
							blocos sobre equipe, conselho, projetos, parceiros e resultados.
							Enquanto isso, a chamada para parceria já conecta o usuário ao
							restante da navegação.
						</p>
					</div>

					<div className="flex flex-col items-start justify-center gap-4 rounded-[1.5rem] bg-white/10 p-6 backdrop-blur-sm">
						<p className="text-lg font-semibold">Acesse uma área de parceria</p>
						<p className="text-sm text-white/85">
							Estrutura pronta para evoluir para conteúdo institucional mais
							detalhado.
						</p>
						<a
							href="/seja-parceiro"
							className="inline-flex min-w-[190px] items-center justify-center rounded-lg bg-white px-5 py-2 font-semibold text-[var(--vermelho)] transition-colors hover:bg-white/90"
						>
							Seja parceiro
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
