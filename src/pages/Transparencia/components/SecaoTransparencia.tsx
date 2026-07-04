import { useState } from "react";
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
      <h2 className="text-4xl font-bold text-[#1C1D1D]">{title}</h2>
      <p className="mt-3 text-xl text-[#1C1D1D]">{subtitle}</p>
    </div>
  );
}

function CartaoDocumento({
  icon,
  title,
  description,
  links,
}: DadosCartaoDocumento) {
  return (
    <article className="flex h-[430px] flex-col rounded-[6px] border border-[#b7b7b7] bg-white px-5 py-8 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#f3dce7]">
        <img src={icon} alt="" className="h-[35px] w-[35px] object-contain" />
      </div>
      <h3 className="mt-6 text-[30px] font-bold text-[#1C1D1D]">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-[#5a5a5a]">
        {description}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3">
        {links.map((link) => (
          <LinkDownload key={link.label} {...link} />
        ))}
      </div>
    </article>
  );
}

function CartaoConveniosRapidos() {
  const cartaoConvenios = cartoesTransparencia[2]!;

  return (
    <article className="flex h-[430px] flex-col items-center rounded-[16px] border border-[#d8d0d0] bg-[#fff9fb] px-6 py-7 text-center shadow-[0_2px_4px_rgba(0,0,0,0.18)] overflow-hidden">
      <div className="flex h-[76px] w-[76px] items-center justify-center rounded-xl bg-[#f3dce7]">
        <img
          src={cartaoConvenios.icon}
          alt=""
          className="h-[35px] w-[35px] object-contain"
        />
      </div>

      <h3 className="mt-8 text-[28px] font-bold text-[#1C1D1D]">Convênios</h3>
      <p className="mt-3 max-w-[360px] text-[17px] leading-tight text-[#5a5a5a]">
        Consulte informações e dados dos convênios firmados.
      </p>

      <div className="mt-8 flex w-full max-w-[360px] flex-1 flex-col justify-start gap-4">
        <div>
          <p className="text-[20px] font-bold text-[#1C1D1D]">SMAS</p>
          <div className="mt-2 flex justify-center">
            <LinkDownload {...conveniosTransparencia.smas} />
          </div>
        </div>

        <div>
          <p className="text-[20px] font-bold text-[#1C1D1D]">SMPD</p>
          <div className="mt-2 flex justify-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-[var(--verde)] px-4 py-2 text-sm font-semibold text-[var(--verde)] transition-colors duration-200 hover:bg-[var(--verde)] hover:text-white"
            >
              <FaDownload className="text-[0.75rem]" />
              TF 023/22 - Ativo
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function CampoDetalhe({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div>
      <p className="text-[16px] font-semibold text-[#1C1D1D]">{title}</p>
      <div className="mt-2 space-y-1 text-[15px] text-[#1C1D1D]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function CartaoSmpdDetalhado() {
  return (
    <article className="h-[430px] w-full overflow-hidden rounded-[14px] bg-[#dde3e8] px-5 py-5 text-[#1C1D1D] shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <h3 className="text-[18px] font-semibold text-[#1C1D1D]">SMPD</h3>
            <h4 className="mt-4 text-[16px] font-bold text-[#216587]">
              Objeto da Parceria
            </h4>
            <p className="mt-2 max-w-[690px] text-[15px] leading-relaxed text-[#1C1D1D]">
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

        <div className="grid grid-cols-[1fr_190px] gap-8">
          <div>
            <h4 className="text-[16px] font-bold text-[#216587]">
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

      <div className="mt-10">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: "200%",
            transform: smpdAtivo ? "translateX(-50%)" : "translateX(0%)",
          }}
        >
          <div className="w-1/2 pr-4">
            <div className="mt-10 grid grid-cols-3 gap-8">
              <CartaoDocumento {...cartaoInformacoes} />
              <CartaoDocumento {...cartaoBalanco} />
              <article className="flex h-[430px] flex-col items-center rounded-[16px] border border-[#d8d0d0] bg-[#fff9fb] px-6 py-7 text-center shadow-[0_2px_4px_rgba(0,0,0,0.18)] overflow-hidden">
                <div className="flex h-[76px] w-[76px] items-center justify-center rounded-xl bg-[#f3dce7]">
                  <img
                    src={cartoesTransparencia[2]!.icon}
                    alt=""
                    className="h-[35px] w-[35px] object-contain"
                  />
                </div>

                <h3 className="mt-8 text-[28px] font-bold text-[#1C1D1D]">
                  Convênios
                </h3>
                <p className="mt-3 max-w-[360px] text-[17px] leading-tight text-[#5a5a5a]">
                  Consulte informações e dados dos convênios firmados.
                </p>

                <div className="mt-8 flex w-full max-w-[360px] flex-1 flex-col justify-start gap-4">
                  <div>
                    <p className="text-[20px] font-bold text-[#1C1D1D]">SMAS</p>
                    <div className="mt-2 flex justify-center">
                      <LinkDownload {...conveniosTransparencia.smas} />
                    </div>
                  </div>

                  <div>
                    <p className="text-[20px] font-bold text-[#1C1D1D]">SMPD</p>
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
              </article>
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
