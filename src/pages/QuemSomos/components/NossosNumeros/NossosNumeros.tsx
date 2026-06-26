import { useMemo, useState } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type ProjetoKey = "vivendo-e-acolhendo" | "saude-integral";

type Serie = {
	label: string;
	color: string;
	data: number[];
};

type ChartPoint = {
	year: string;
	value: number;
};

const anos = [
	"2011",
	"2012",
	"2013",
	"2014",
	"2015",
	"2016",
	"2017",
	"2018",
	"2019",
	"2020",
	"2021",
	"2022",
	"2023",
	"2024",
	"2025",
];

const projetos: Record<ProjetoKey, { nome: string; series: Serie[] }> = {
	"vivendo-e-acolhendo": {
		nome: "Vivendo e acolhendo",
		series: [
			{
				label: "Vivendo e acolhendo",
				color: "#43b7ff",
				data: [
					3439, 6227, 4114, 3308, 4637, 4555, 5488, 4604, 4477, 2614, 1429,
					1167, 2400, 1300, 1500,
				],
			},
		],
	},
	"saude-integral": {
		nome: "Saúde integral",
		series: [
			{
				label: "Saúde integral",
				color: "#ff9f43",
				data: [
					1780, 3304, 3534, 4773, 6978, 5141, 4755, 4257, 3912, 1839, 2698,
					1781, 1605, 1087, 1250,
				],
			},
		],
	},
};

function calculateCumulative(data: number[]) {
	return data.reduce<number[]>((accumulator, value, index) => {
		const previous = index === 0 ? 0 : accumulator[index - 1] ?? 0;
		accumulator.push(previous + value);
		return accumulator;
	}, []);
}

function formatNumber(value: number) {
	return new Intl.NumberFormat("pt-BR").format(value);
}

function clampIndex(index: number) {
	return Math.min(Math.max(index, 0), anos.length - 1);
}

function getChartData(series: Serie, anoInicial: string, anoFinal: string) {
	const indiceInicial = clampIndex(anos.indexOf(anoInicial));
	const indiceFinal = clampIndex(anos.indexOf(anoFinal));
	const inicio = Math.min(indiceInicial, indiceFinal);
	const fim = Math.max(indiceInicial, indiceFinal);
	const anosFiltrados = anos.slice(inicio, fim + 1);
	const valoresFiltrados = calculateCumulative(series.data.slice(inicio, fim + 1));

	return anosFiltrados.map((year, index) => ({
		year,
		value: valoresFiltrados[index] ?? 0,
	}));
}

export default function NossosNumeros() {
	const [anoInicial, setAnoInicial] = useState("2011");
	const [anoFinal, setAnoFinal] = useState("2025");
	const [projetoSelecionado, setProjetoSelecionado] = useState<ProjetoKey>(
		"vivendo-e-acolhendo",
	);

	const projetoAtual = projetos[projetoSelecionado];
	const serieSelecionada = projetoAtual.series[0]!;
	const chartData = useMemo(
		() => getChartData(serieSelecionada, anoInicial, anoFinal),
		[serieSelecionada, anoInicial, anoFinal],
	);
	const totalAcumulado = chartData[chartData.length - 1]?.value ?? 0;

	return (
		<section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
			<div className="overflow-hidden rounded-[2rem] bg-[#b70a0a] px-5 py-10 text-white shadow-lg lg:px-10">
				<div className="text-center">
					<h2 className="text-3xl font-bold lg:text-4xl">Nossos Números</h2>
				</div>

				<div className="mt-8 flex flex-col items-center justify-center gap-4 text-sm font-semibold lg:flex-row lg:gap-6">
					<label className="flex items-center gap-3">
						<span>Ano Inicial</span>
						<select
							value={anoInicial}
							onChange={(event) => setAnoInicial(event.target.value)}
							className="min-w-[84px] rounded-md border border-white/60 bg-transparent px-3 py-2 text-white outline-none transition focus:border-white"
						>
							{anos.map((ano) => (
								<option key={ano} value={ano} className="text-black">
									{ano}
								</option>
							))}
						</select>
					</label>

					<label className="flex items-center gap-3">
						<span>Ano Final</span>
						<select
							value={anoFinal}
							onChange={(event) => setAnoFinal(event.target.value)}
							className="min-w-[84px] rounded-md border border-white/60 bg-transparent px-3 py-2 text-white outline-none transition focus:border-white"
						>
							{anos.map((ano) => (
								<option key={ano} value={ano} className="text-black">
									{ano}
								</option>
							))}
						</select>
					</label>

					<label className="flex items-center gap-3">
						<span>Projeto</span>
						<select
							value={projetoSelecionado}
							onChange={(event) =>
								setProjetoSelecionado(event.target.value as ProjetoKey)
							}
							className="min-w-[200px] rounded-md border border-white/60 bg-transparent px-3 py-2 text-white outline-none transition focus:border-white"
						>
							<option value="vivendo-e-acolhendo" className="text-black">
								Vivendo e acolhendo
							</option>
							<option value="saude-integral" className="text-black">
								Saúde integral
							</option>
						</select>
					</label>
				</div>

				<div className="mt-10 rounded-[1.5rem] bg-[#821111] p-4 lg:p-6">
					<div className="h-[360px] w-full">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData} margin={{ top: 20, right: 24, left: 0, bottom: 8 }}>
								<CartesianGrid stroke="rgba(255,255,255,0.16)" vertical={false} />
								<XAxis dataKey="year" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 12 }} />
								<YAxis
									stroke="#ffffff"
									tick={{ fill: "#ffffff", fontSize: 12 }}
									tickFormatter={formatNumber}
								/>
								<Tooltip
									contentStyle={{
										backgroundColor: "rgba(0, 0, 0, 0.85)",
										border: "none",
										borderRadius: "12px",
										color: "#fff",
									}}
									labelStyle={{ color: "#fff", fontWeight: 700 }}
									formatter={(value) => [formatNumber(Number(value ?? 0)), serieSelecionada.label] as [string, string]}
								/>
								<Legend wrapperStyle={{ color: "#fff" }} />
								<Line
									type="monotone"
									dataKey="value"
									name={projetoAtual.nome}
									stroke={serieSelecionada.color}
									strokeWidth={3}
									dot={{ r: 6, strokeWidth: 3, fill: "#ffffff" }}
									activeDot={{ r: 8 }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-white/90">
					<div className="flex items-center gap-2">
						<span
							className="inline-block h-3 w-3 rounded-full"
							style={{ backgroundColor: serieSelecionada.color }}
						/>
						{projetoAtual.nome}
					</div>
					<div>
						Período filtrado: {chartData[0]?.year} - {chartData[chartData.length - 1]?.year}
					</div>
					<div>Total acumulado: {formatNumber(totalAcumulado)}</div>
				</div>
			</div>
		</section>
	);
}
