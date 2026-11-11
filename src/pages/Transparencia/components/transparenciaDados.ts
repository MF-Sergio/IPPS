import infoIcone from "../../../assets/img/info.svg";
import contabilIcone from "../../../assets/img/contabil.svg";
import conveniosIcone from "../../../assets/img/convenios.svg";

// Informações complementares
import cneasPdf from "../../../assets/doc/info-comple/IPPS - CNEAS.pdf";
import estatutoPdf from "../../../assets/doc/info-comple/Estatuto atual 19 09 2023.pdf";
import ataEleicaoPdf from "../../../assets/doc/info-comple/ATA -  Ata da Assembleia - Registrada no RCPJ - 21-09-2022 a 20-09-2027 - Eleição do Grupo Gestor atual - COLORIDA.pdf";

// Balanço contábil
import balanco2022Pdf from "../../../assets/doc/info-comple/Balanço Patrimonial e DRE 2022.pdf";
import balanco2023Pdf from "../../../assets/doc/info-comple/Balanço Patrimonial e DRE 2023.pdf";
import balanco2024Pdf from "../../../assets/doc/info-comple/Balanço Patrimonial e DRE 2024.pdf";
import balanco2025Pdf from "../../../assets/doc/info-comple/Balanço Patrimonial e DRE 2025.pdf";

// Convênio SMAS — Termo de Fomento 73/2019
import smasTermoFomentoPdf from "../../../assets/doc/smas/20190625 - Termo de Fomento SMASDH-IPPS - Nº 73-2019.pdf";
import smasAditivo1Pdf from "../../../assets/doc/smas/1º Termo aditivo ao TF 73 2019.pdf";
import smasAditivo2Pdf from "../../../assets/doc/smas/2º Termo aditivo ao TF 73 2019.pdf";
import smasPlanoTrabalhoPdf from "../../../assets/doc/smas/Plano de Trabalho.pdf";
import smasContas2019Pdf from "../../../assets/doc/smas/Prestação de Contas 2019.pdf";
import smasContas2020Pdf from "../../../assets/doc/smas/Prestação de Contas 2020.pdf";
import smasContas2021Pdf from "../../../assets/doc/smas/Prestação de Contas 2021.pdf";

// Convênio SMPD — Termo de Colaboração 023/2022
import smpdTermoColaboracaoPdf from "../../../assets/doc/smpd/Termo de Colaboração 023 2022 - Instrumento nº  23-2022 - Termo de colaboração entre o IPPS e SMAS.pdf";
import smpdAditivo1Pdf from "../../../assets/doc/smpd/1º Termo Aditivo ao TC 23 2022 com a SMPD assinado .pdf";
import smpdAditivo2Pdf from "../../../assets/doc/smpd/2º Termo Aditivo ao TC 23 2022 com a SMPD assinado pelo IPPS.pdf";
import smpdAditivo3Pdf from "../../../assets/doc/smpd/3º Termo aditivo nº 20 2025.pdf";
import smpdPlanoTrabalhoPdf from "../../../assets/doc/smpd/IPPS - Plano de Trabalho do 2º Aditivo ao TC 023 2022.pdf";
import smpdContas2022Pdf from "../../../assets/doc/smpd/2022.pdf";
import smpdContas2023Pdf from "../../../assets/doc/smpd/2023.pdf";
import smpdContas2024Pdf from "../../../assets/doc/smpd/2024.pdf";
import smpdContas2025Pdf from "../../../assets/doc/smpd/2025.pdf";
import smpdContas2026Pdf from "../../../assets/doc/smpd/2026.pdf";
import smpdMensalPdf from "../../../assets/doc/smpd/Planilha Informações Transparência Mensal.pdf";

export type LinkDocumento = {
  label: string;
  href?: string;
};

export type DadosCartaoDocumento = {
  icon: string;
  title: string;
  description: string;
  links: LinkDocumento[];
};

export type ConvenioId = "smas" | "smpd";

export type CampoInformacao = {
  title: string;
  lines: string[];
};

export type GrupoDocumentos = {
  title: string;
  /** "anos" usa colunas mais estreitas, pois os rótulos são curtos. */
  variante: "documentos" | "anos";
  links: LinkDocumento[];
};

export type DadosConvenio = {
  id: ConvenioId;
  sigla: string;
  /** Texto do botão que abre o detalhe do convênio. */
  rotuloBotao: string;
  objeto: string;
  informacoes: CampoInformacao[];
  /** Destaque "Acesse aqui a prestação de contas" (apenas convênios com prestação mensal). */
  prestacaoMensal?: LinkDocumento;
  grupos: GrupoDocumentos[];
};

export const tituloTransparencia = "Transparência";

export const introducaoTransparencia = {
  title: "Transformar realidades exige mais do que ação, exige confiança.",
  description:
    "No IPPS, a transparência faz parte do nosso compromisso com cada pessoa atendida, parceiro e apoiador. Aqui, você encontra conteúdos que mostram de forma clara como atuamos, resultados que geramos e os aprendizados.",
};

export const secaoTransparencia = {
  title: "Acompanhe receitas, despesas e relatórios do IPPS",
  subtitle:
    "Acesse informações financeiras e documentos oficiais com total transparência.",
};

export const cartoesTransparencia: DadosCartaoDocumento[] = [
  {
    icon: infoIcone,
    title: "Informações",
    description: "Acesse documentos e informações adicionais do IPPS.",
    links: [
      { label: "CNEAS", href: cneasPdf },
      { label: "CEBAS" },
      { label: "Estatuto", href: estatutoPdf },
      { label: "Ata Eleição", href: ataEleicaoPdf },
    ],
  },
  {
    icon: contabilIcone,
    title: "Balanço Contábil",
    description: "Consulte demonstrativos financeiros e resultados contábeis.",
    links: [
      { label: "2022", href: balanco2022Pdf },
      { label: "2023", href: balanco2023Pdf },
      { label: "2024", href: balanco2024Pdf },
      { label: "2025", href: balanco2025Pdf },
    ],
  },
  {
    icon: conveniosIcone,
    title: "Convênios",
    description: "Consulte informações e dados dos convênios firmados.",
    links: [],
  },
];

export const convenios: DadosConvenio[] = [
  {
    id: "smas",
    sigla: "SMAS",
    rotuloBotao: "TF 73/19 - Encerrado",
    objeto:
      "Atendimento Socioassistencial a 100 (cem) pessoas com deficiência, em situação de vulnerabilidade pela deficiência e pelo nível de pobreza, por meio da promoção de habilitação, reabilitação e integração à vida comunitária, visando a melhoria da qualidade de vida e a garantia do exercício da cidadania.",
    informacoes: [
      { title: "Data de assinatura:", lines: ["01/05/2019"] },
      {
        title: "Data da vigência:",
        lines: ["Início: 01/05/2019", "Término: 25/04/2022"],
      },
      {
        title: "Valor do Termo:",
        lines: ["R$ 720.000,00 (setecentos e vinte mil reais)"],
      },
      { title: "Prestação de contas:", lines: ["Anual"] },
    ],
    grupos: [
      {
        title: "Termo de Fomento",
        variante: "documentos",
        links: [
          { label: "TF 73/2019", href: smasTermoFomentoPdf },
          { label: "1º Aditivo", href: smasAditivo1Pdf },
          { label: "2º Aditivo", href: smasAditivo2Pdf },
          { label: "Plano de Trabalho", href: smasPlanoTrabalhoPdf },
        ],
      },
      {
        title: "Prestação de Contas",
        variante: "anos",
        links: [
          { label: "2019", href: smasContas2019Pdf },
          { label: "2020", href: smasContas2020Pdf },
          { label: "2021", href: smasContas2021Pdf },
        ],
      },
    ],
  },
  {
    id: "smpd",
    sigla: "SMPD",
    rotuloBotao: "TC 023/22 - Ativo",
    objeto:
      "Execução de serviço de Proteção Especial para pessoas com Deficiências na modalidade Centro dia e similares, com disponibilidade de 200 metas (usuários cadastrados) visando promover atividades e projetos para reduzir a vulnerabilidade e ampliar a autonomia, autocuidado, interação social e o exercício da cidadania.",
    informacoes: [
      { title: "Data de assinatura:", lines: ["26/04/2022"] },
      {
        title: "Data da vigência:",
        lines: ["Início: 26/04/2022", "Término: 25/04/2027"],
      },
      {
        title: "Valor do Termo:",
        lines: [
          "R$ 3.251.180,00 (três milhões duzentos e cinquenta e um mil cento e oitenta reais)",
        ],
      },
    ],
    prestacaoMensal: { label: "Mensal", href: smpdMensalPdf },
    grupos: [
      {
        title: "Termo de Colaboração",
        variante: "documentos",
        links: [
          { label: "TC 023/2022", href: smpdTermoColaboracaoPdf },
          { label: "1º Aditivo", href: smpdAditivo1Pdf },
          { label: "2º Aditivo", href: smpdAditivo2Pdf },
          { label: "3º Aditivo", href: smpdAditivo3Pdf },
          { label: "Plano de Trabalho", href: smpdPlanoTrabalhoPdf },
        ],
      },
      {
        title: "Prestação de Contas",
        variante: "anos",
        links: [
          { label: "2022", href: smpdContas2022Pdf },
          { label: "2023", href: smpdContas2023Pdf },
          { label: "2024", href: smpdContas2024Pdf },
          { label: "2025", href: smpdContas2025Pdf },
          { label: "2026", href: smpdContas2026Pdf },
        ],
      },
    ],
  },
];
