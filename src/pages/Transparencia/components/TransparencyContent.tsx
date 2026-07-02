import { useState } from "react";
import { FaDownload } from "react-icons/fa6";
import {
  cartoesParceiros,
  cartoesTransparencia,
  conveniosTransparencia,
  tituloTransparencia,
  introducaoTransparencia,
  secaoTransparencia,
  type DadosCartaoDocumento,
  type DadosCartaoParceiro,
  type LinkDocumento,
} from "../transparenciaData";

type VisaoTransparencia = "visaoGeral" | "smpd";

const iconeConveniosRapidos = cartoesTransparencia[2]?.icon ?? "";
const acoesSmas = cartoesParceiros[0]?.actionLinks ?? [];
const acoesSmpd = cartoesParceiros[1]?.actionLinks ?? [];
const cartaoSmpd = cartoesParceiros[1] as DadosCartaoParceiro;

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

function BotaoAcao({ label, onClick }: { label: string; onClick: () => void }) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 rounded-md border-2 border-[var(--verde)] px-4 py-2 text-sm font-semibold text-[var(--verde)] transition-colors duration-200 hover:bg-[var(--verde)] hover:text-white";

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      <FaDownload className="text-[0.75rem]" />
      {label}
    </button>
  );
}

function TituloTransparencia() {
  return (
    <div className="mt-15 w-full text-center">
      <h1 className="text-4xl font-bold text-[var(--vermelho)]">
        {tituloTransparencia}
      </h1>
    </div>
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

function PainelInformativo() {
  return (
    <section className="w-full pb-8 pt-2">
      <div className="rounded-2xl border border-[#e5bfd0] bg-[#f2cfde] px-12 py-14 text-center shadow-[0_2px_6px_rgba(0,0,0,0.18)]">
        <h2 className="text-[22px] font-bold text-[#1C1D1D]">
          {introducaoTransparencia.title}
        </h2>
        <p className="mx-auto mt-6 text-center text-[18px] font-medium leading-relaxed text-[#333]">
          {introducaoTransparencia.description}
        </p>
      </div>
    </section>
  );
}

function CartaoDocumento({
  icon,
  title,
  description,
  links,
}: DadosCartaoDocumento) {
  return (
    <article className="flex h-full flex-col rounded-[6px] border border-[#b7b7b7] bg-white px-5 py-8 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#f3dce7]">
        <img src={icon} alt="" className="h-9 w-9 object-contain" />
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

function CartaoConveniosRapidos({ onOpenSmpd }: { onOpenSmpd: () => void }) {
  return (
    <article className="flex h-full flex-col rounded-[6px] border border-[#b7b7b7] bg-white px-5 py-8 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-[#f3dce7]">
        <img
          src={iconeConveniosRapidos}
          alt=""
          className="h-9 w-9 object-contain"
        />
      </div>
      <h3 className="mt-6 text-[30px] font-bold text-[#1C1D1D]">Convênios</h3>
      <p className="mt-3 text-[18px] leading-relaxed text-[#5a5a5a]">
        Consulte informações e dados dos convênios firmados.
      </p>

      <div className="mt-8 space-y-5 text-center">
        <div>
          <p className="text-base font-bold text-[#4f4f4f]">SMAS</p>
          <div className="mt-3 flex justify-center">
            <LinkDownload {...conveniosTransparencia.smas} />
          </div>
        </div>

        <div>
          <p className="text-base font-bold text-[#4f4f4f]">SMPD</p>
          <div className="mt-3 flex justify-center">
            <BotaoAcao
              label={conveniosTransparencia.smpd.label}
              onClick={onOpenSmpd}
            />
          </div>
        </div>
      </div>
    </article>
  );
}

function AcoesCompactas({
  title,
  items,
}: {
  title: string;
  items: LinkDocumento[];
}) {
  return (
    <div className="text-center">
      <h3 className="text-[30px] font-bold text-[#2f2f2f]">{title}</h3>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        {items.map((item) => (
          <LinkDownload key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}

function CampoParceiro({
  title,
  lines,
}: DadosCartaoParceiro["infoFields"][number]) {
  return (
    <div className="rounded-xl border border-[#dfcad1] bg-white p-4">
      <p className="text-sm font-bold uppercase tracking-wide text-[#7d7d7d]">
        {title}
      </p>
      {lines.map((line) => (
        <p key={line} className="mt-1 text-base text-[#333]">
          {line}
        </p>
      ))}
    </div>
  );
}

function CartaoParceiro({
  title,
  objectTitle,
  objectDescription,
  infoFields,
  actionTitle,
  actionLinks,
}: DadosCartaoParceiro) {
  return (
    <article className="rounded-2xl border border-[#e5d2d8] bg-[#f9f2f5] p-6 text-left shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
      <h3 className="text-[30px] font-bold text-[#2f2f2f]">{title}</h3>
      <h4 className="mt-4 text-[20px] font-bold text-[#4a4a4a]">
        {objectTitle}
      </h4>
      <p className="mt-2 text-[18px] leading-relaxed text-[#555]">
        {objectDescription}
      </p>

      <h4 className="mt-6 text-[20px] font-bold text-[#4a4a4a]">
        Informações:
      </h4>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {infoFields.map((field) => (
          <CampoParceiro key={field.title} {...field} />
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-bold text-[#4a4a4a]">{actionTitle}</h4>
        <div className="mt-4 flex flex-wrap gap-3">
          {actionLinks.map((link) => (
            <LinkDownload key={link.label} {...link} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function ConteudoTransparencia() {
  const [visao, setVisao] = useState<VisaoTransparencia>("visaoGeral");

  return (
    <section
      className="overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: visao === "smpd" ? "#21658726" : "transparent",
      }}
    >
      <TituloTransparencia />
      <PainelInformativo />

      <section className="w-full py-6">
        <div className="overflow-hidden rounded-[30px]">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: "200%",
              transform:
                visao === "smpd" ? "translateX(-50%)" : "translateX(0%)",
            }}
          >
            <div className="w-1/2 pr-4">
              <TituloSecao {...secaoTransparencia} />

              <div className="mt-10 grid grid-cols-3 gap-8">
                {cartoesTransparencia.slice(0, 2).map((card) => (
                  <CartaoDocumento key={card.title} {...card} />
                ))}
                <CartaoConveniosRapidos onOpenSmpd={() => setVisao("smpd")} />
              </div>

              <div className="mt-10 rounded-2xl border border-[#eadede] bg-white px-5 py-7 shadow-[0_2px_6px_rgba(0,0,0,0.1)]">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <AcoesCompactas title="SMAS" items={acoesSmas} />
                  <AcoesCompactas title="SMPD" items={acoesSmpd} />
                </div>
              </div>
            </div>

            <div className="w-1/2 pl-4">
              <div className="flex min-h-full items-start justify-center px-2 py-4">
                <div className="w-full max-w-4xl rounded-[32px] p-4">
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setVisao("visaoGeral")}
                      className="rounded-full border-2 border-[var(--verde)] px-5 py-2 text-sm font-semibold text-[var(--verde)] transition-colors duration-200 hover:bg-[var(--verde)] hover:text-white"
                    >
                      Voltar
                    </button>
                  </div>

                  <CartaoParceiro {...cartaoSmpd} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
