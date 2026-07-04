import { useState, type ReactNode } from "react";
import { FaDownload } from "react-icons/fa6";
import {
  cartoesTransparencia,
  conveniosTransparencia,
  secaoTransparencia,
  type DadosCartaoDocumento,
  type LinkDocumento,
} from "./transparenciaDados";

function LinkDownload({ label, href }: LinkDocumento) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-md border-2 border-[var(--verde)] px-4 py-2 text-sm font-semibold text-[var(--verde)] transition-colors duration-200 hover:bg-[var(--verde)] hover:text-white";

  if (!href) {
    return (
      <span
        className={`${baseClasses} cursor-not-allowed opacity-45`}
        aria-disabled="true"
      >
        <FaDownload className="text-[0.75rem]" />
        {label}
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={baseClasses}>
      <FaDownload className="text-[0.75rem]" />
      {label}
    </a>
  );
}

function TituloSecao({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-[22px] font-semibold text-[#1C1D1D]">{title}</h2>
      <p className="mt-3 text-[18px] font-medium text-[#1C1D1D]">{subtitle}</p>
    </div>
  );
}

type CartaoDocumentoProps = DadosCartaoDocumento & {
  footer?: ReactNode;
};

function CartaoDocumento({
  icon,
  title,
  description,
  links,
  footer,
}: CartaoDocumentoProps) {
  return (
    <article className="flex h-[430px] flex-col rounded-[6px] border border-[#b7b7b7] bg-white px-5 py-8 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <div className="mx-auto flex h-[73px] w-[73px] items-center justify-center rounded-xl bg-[#f3dce7]">
        <img src={icon} alt="" className="h-[35px] w-[35px] object-contain" />
      </div>
      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="text-[20px] font-semibold text-[#1C1D1D]">{title}</h3>
        <p className="mt-3 text-base font-medium leading-relaxed text-[#5a5a5a]">
          {description}
        </p>
        {links.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-3">
            {links.map((link) => (
              <LinkDownload key={link.label} {...link} />
            ))}
          </div>
        ) : null}
        {footer ? <div className="mt-auto pt-8">{footer}</div> : null}
      </div>
    </article>
  );
}

function CampoDetalhe({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <p className="shrink-0 text-[15px] font-semibold text-[#1C1D1D]">
        {title}
      </p>
      <div className="flex flex-wrap gap-4 text-[15px] text-[#1C1D1D] font-medium">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function CartaoSmpdDetalhado() {
  return (
    <article className="h-[430px] w-full overflow-hidden rounded-[14px] bg-[#dde3e8] px-[78px] py-[24.5px] text-[#1C1D1D] shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <div className="flex h-full flex-col justify-between">
        <h3 className="self-start text-[18px] font-semibold text-[#1C1D1D]">
          SMPD
        </h3>
        <div className="flex items-start justify-between gap-5">
          <div className="text-start min-w-0 flex-1">
            <h4 className="text-[16px] font-bold text-[#216587]">
              Objeto da Parceria
            </h4>
            <p className="mt-2 max-w-[600px] text-[15px] leading-relaxed text-[#1C1D1D]">
              Execução de serviço de Proteção Especial para pessoas com
              Deficiências na modalidade Centro dia e similares, com
              disponibilidade de 200 metas (usuários cadastrados) visando
              promover atividades e projetos para reduzir a vulnerabilidade e
              ampliar a autonomia, autocuidado, interação social e o exercício
              da cidadania.
            </p>
          </div>

          <div className="flex w-[190px] shrink-0 flex-col items-center justify-center self-center text-center">
            <p className="text-[15px] font-bold leading-tight text-[#1C1D1D]">
              Acesse Aqui
              <br />A Prestação de Contas
            </p>
            <div className="mt-3">
              <LinkDownload {...conveniosTransparencia.mensalSmpd} />
            </div>
          </div>
        </div>

        <div className="pb-6 grid grid-cols-[1fr_190px] gap-8">
          <div>
            <h4 className="text-start text-[16px] font-bold text-[#216587]">
              Informações
            </h4>
            <div className="mt-2 space-y-4">
              <CampoDetalhe
                title="Data de assinatura:"
                lines={["26/04/2022"]}
              />
              <CampoDetalhe
                title="Data da vigência:"
                lines={["Início: 26/04/2022", "Término: 25/04/2026"]}
              />
              <CampoDetalhe
                title="Valor do Termo:"
                lines={[
                  "R$2.595.980,00 (dois milhões quinhentos e noventa e cinco mil)",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function SecaoTransparencia() {
  const cartaoInformacoes = cartoesTransparencia[0]!;
  const cartaoBalanco = cartoesTransparencia[1]!;
  const cartaoConvenios = cartoesTransparencia[2]!;
  const [smpdAtivo, setSmpdAtivo] = useState(false);

  function abrirSmpd() {
    setSmpdAtivo(true);
  }

  function voltarParaGeral() {
    setSmpdAtivo(false);
  }

  return (
    <section className="w-full overflow-hidden py-6">
      <TituloSecao {...secaoTransparencia} />

      <div className="mt-5">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: "200%",
            transform: smpdAtivo ? "translateX(-50%)" : "translateX(0%)",
          }}
        >
          <div className="w-1/2 pr-4">
            <div className="mt-10 grid grid-cols-3 gap-[58px]">
              <CartaoDocumento {...cartaoInformacoes} />
              <CartaoDocumento {...cartaoBalanco} />
              <CartaoDocumento
                {...cartaoConvenios}
                links={[]}
                footer={
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-[13.5px] font-bold text-[#1C1D1D]">
                        SMAS
                      </p>
                      <div className="mt-2 flex justify-center">
                        <LinkDownload {...conveniosTransparencia.smas} />
                      </div>
                    </div>

                    <div>
                      <p className="text-[13.5px] font-bold text-[#1C1D1D]">
                        SMPD
                      </p>
                      <div className="mt-2 flex justify-center">
                        <button
                          type="button"
                          onClick={abrirSmpd}
                          className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[var(--verde)] px-4 py-2 text-sm font-semibold text-[var(--verde)] transition-colors duration-200 hover:bg-[var(--verde)] hover:text-white"
                        >
                          <FaDownload className="text-[0.75rem]" />
                          TF 023/22 - Ativo
                        </button>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          <div className="w-1/2 pl-4">
            <div className="relative flex h-full items-start justify-center px-2 py-4">
              <button
                type="button"
                onClick={voltarParaGeral}
                className={`absolute right-3 top-0 rounded-full border-2 border-[var(--verde)] px-3 py-1 text-xs font-semibold text-[var(--verde)] transition-all duration-700 hover:bg-[var(--verde)] hover:text-white ${
                  smpdAtivo ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                Voltar
              </button>
              <div className="w-full pt-8">
                <CartaoSmpdDetalhado />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
