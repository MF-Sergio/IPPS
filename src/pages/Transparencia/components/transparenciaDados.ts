import infoIcone from "../../../assets/img/info.svg";
import contabilIcone from "../../../assets/img/contabil.svg";
import conveniosIcone from "../../../assets/img/convenios.svg";
import cneasPdf from "../../../assets/doc/info-comple/IPPS - CNEAS.pdf";
import estatutoPdf from "../../../assets/doc/info-comple/Estatuto atual 19 09 2023.pdf";
import ataEleicaoPdf from "../../../assets/doc/info-comple/ATA -  Ata da Assembleia - Registrada no RCPJ - 21-09-2022 a 20-09-2027 - Eleição do Grupo Gestor atual - COLORIDA.pdf";
import balanco2022Pdf from "../../../assets/doc/info-comple/Balanço Patrimonial e DRE 2022.pdf";
import balanco2023Pdf from "../../../assets/doc/info-comple/Balanço Patrimonial e DRE 2023.pdf";
import balanco2024Pdf from "../../../assets/doc/smpd/2024.pdf";
import balanco2025Pdf from "../../../assets/doc/smpd/2025.pdf";
import balanco2026Pdf from "../../../assets/doc/smpd/2026.pdf";
import mensalSmpdPdf from "../../../assets/doc/smpd/Planilha Informações Transparência Mensal.pdf";
import termoFomentoPdf from "../../../assets/doc/smas/20190625 - Termo de Fomento SMASDH-IPPS - Nº 73-2019.pdf";
import termoColaboracaoPdf from "../../../assets/doc/smpd/Termo de Colaboração 023 2022 - Instrumento nº  23-2022 - Termo de colaboração entre o IPPS e SMAS.pdf";

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

export const conveniosTransparencia = {
  smas: { label: "TF 73/19 - Encerrado", href: termoFomentoPdf },
  smpd: { label: "TF 023/22 - Ativo", href: termoColaboracaoPdf },
  mensalSmpd: { label: "Mensal", href: mensalSmpdPdf },
};