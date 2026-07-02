import transparenciaHero from "../../assets/img/foto_hero_transparencia.png";
import infoIcone from "../../assets/img/info+.png";
import contabilIcone from "../../assets/img/contabil.png";
import conveniosIcone from "../../assets/img/transparencia.png";

import cneasPdf from "../../assets/doc/info-comple/IPPS - CNEAS.pdf";
import estatutoPdf from "../../assets/doc/info-comple/Estatuto atual 19 09 2023.pdf";
import ataEleicaoPdf from "../../assets/doc/info-comple/ATA -  Ata da Assembleia - Registrada no RCPJ - 21-09-2022 a 20-09-2027 - Eleição do Grupo Gestor atual - COLORIDA.pdf";
import balanco2022Pdf from "../../assets/doc/info-comple/Balanço Patrimonial e DRE 2022.pdf";
import balanco2023Pdf from "../../assets/doc/info-comple/Balanço Patrimonial e DRE 2023.pdf";
import balanco2024Pdf from "../../assets/doc/smpd/2024.pdf";
import balanco2025Pdf from "../../assets/doc/smpd/2025.pdf";
import balanco2026Pdf from "../../assets/doc/smpd/2026.pdf";
import termoFomentoPdf from "../../assets/doc/smas/20190625 - Termo de Fomento SMASDH-IPPS - Nº 73-2019.pdf";
import aditivo1Pdf from "../../assets/doc/smas/1º Termo aditivo ao TF 73 2019.pdf";
import aditivo2Pdf from "../../assets/doc/smas/2º Termo aditivo ao TF 73 2019.pdf";
import planoTrabalhoSmasPdf from "../../assets/doc/smas/Plano de Trabalho.pdf";
import prestacao2019Pdf from "../../assets/doc/smas/Prestação de Contas 2019.pdf";
import prestacao2020Pdf from "../../assets/doc/smas/Prestação de Contas 2020.pdf";
import prestacao2021Pdf from "../../assets/doc/smas/Prestação de Contas 2021.pdf";
import mensalSmpdPdf from "../../assets/doc/smpd/Planilha Informações Transparência Mensal.pdf";
import termoColaboracaoPdf from "../../assets/doc/smpd/Termo de Colaboração 023 2022 - Instrumento nº  23-2022 - Termo de colaboração entre o IPPS e SMAS.pdf";
import planoTrabalhoSmpdPdf from "../../assets/doc/smpd/IPPS - Plano de Trabalho do 2º Aditivo ao TC 023 2022.pdf";

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

export type DadosCartaoParceiro = {
  title: string;
  objectTitle: string;
  objectDescription: string;
  infoFields: Array<{ title: string; lines: string[] }>;
  actionTitle: string;
  actionLinks: LinkDocumento[];
};

export const recursosTransparencia = {
  hero: transparenciaHero,
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
      { label: "2026", href: balanco2026Pdf },
    ],
  },
  {
    icon: conveniosIcone,
    title: "Convênios",
    description: "Consulte informações e dados dos convênios firmados.",
    links: [
      { label: "SMAS", href: termoFomentoPdf },
      { label: "SMPD", href: termoColaboracaoPdf },
    ],
  },
];

export const cartoesParceiros: DadosCartaoParceiro[] = [
  {
    title: "SMAS",
    objectTitle: "Objeto da Parceria:",
    objectDescription:
      "Atendimento Socioassistencial a 100 pessoas com deficiência, em situação de vulnerabilidade pela deficiência e pelo nível de pobreza, por meio da promoção de habilitação, reabilitação e integração à vida comunitária, visando a melhoria da qualidade de vida e a garantia do exercício da cidadania.",
    infoFields: [
      { title: "Data assinatura", lines: ["Início: 01/05/2019"] },
      {
        title: "Data da vigência",
        lines: ["Início: 01/05/2019", "Término: 25/04/2022"],
      },
      { title: "Valor do Termo", lines: ["R$ 720.000,00"] },
      { title: "Prestação de contas", lines: ["Anual"] },
    ],
    actionTitle: "Prestação de Contas",
    actionLinks: [
      { label: "2019", href: prestacao2019Pdf },
      { label: "2020", href: prestacao2020Pdf },
      { label: "2021", href: prestacao2021Pdf },
    ],
  },
  {
    title: "SMPD",
    objectTitle: "Objeto da Parceria:",
    objectDescription:
      "Execução de serviço de Proteção Especial para pessoas com Deficiências na modalidade Centro dia e similares, com disponibilidade de 200 metas, visando promover atividades e projetos para reduzir a vulnerabilidade e ampliar a autonomia, autocuidado, interação social e o exercício da cidadania.",
    infoFields: [
      { title: "Data assinatura", lines: ["26/04/2022"] },
      {
        title: "Data da vigência",
        lines: ["Início: 26/04/2022", "Término: 25/04/2026"],
      },
      { title: "Valor do Termo", lines: ["R$ 2.595.980,00"] },
      { title: "Prestação de contas", lines: ["Mensal"] },
    ],
    actionTitle: "Termo de Colaboração",
    actionLinks: [
      { label: "TC 023/2022", href: termoColaboracaoPdf },
      { label: "Plano de Trabalho", href: planoTrabalhoSmpdPdf },
      { label: "Mensal", href: mensalSmpdPdf },
    ],
  },
];

export const conveniosTransparencia = {
  smas: { label: "TF 73/19 - Encerrado", href: termoFomentoPdf },
  smpd: { label: "TF 023/22 - Ativo", href: termoColaboracaoPdf },
};
