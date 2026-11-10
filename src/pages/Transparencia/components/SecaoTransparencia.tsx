import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react";
import { FaArrowRight, FaChevronDown, FaDownload } from "react-icons/fa6";
import {
  cartoesTransparencia,
  convenios,
  secaoTransparencia,
  type CampoInformacao,
  type ConvenioId,
  type DadosCartaoDocumento,
  type DadosConvenio,
  type LinkDocumento,
} from "./transparenciaDados";

const DURACAO_TRANSICAO = "duration-700";

function buscarConvenio(id: ConvenioId): DadosConvenio {
  return convenios.find((convenio) => convenio.id === id)!;
}

function LinkDownload({ label, href }: LinkDocumento) {
  const baseClasses =
    "inline-flex w-full items-center sm:justify-center gap-2 rounded-md border-2 border-[var(--verde)] px-4 py-2 text-sm font-semibold text-[var(--verde)] transition-colors duration-200 hover:bg-[var(--verde)] hover:text-white sm:max-w-[200px]";

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
    <article className="flex min-h-[430px] flex-col rounded-[6px] border border-[#b7b7b7] bg-white px-4 py-6 shadow-[0_2px_4px_rgba(0,0,0,0.18)] md:h-[430px] md:px-5 md:py-8">
      <div className="mx-auto flex h-[73px] w-[73px] items-center justify-center rounded-xl bg-[#f3dce7]">
        <img src={icon} alt="" className="h-[35px] w-[35px] object-contain" />
      </div>
      <div className="mt-6 flex flex-1 flex-col items-center text-center">
        <h3 className="text-[20px] font-semibold text-[#1C1D1D]">{title}</h3>
        <p className="mt-3 max-w-[290px] text-base font-medium leading-relaxed text-[#5a5a5a] md:max-w-none">
          {description}
        </p>
        {links.length > 0 ? (
          <div className="mt-8 grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:justify-items-start">
            {links.map((link) => (
              <LinkDownload key={link.label} {...link} />
            ))}
          </div>
        ) : null}
        {footer ? (
          <div className="mt-8 w-full md:mt-auto md:pt-8">{footer}</div>
        ) : null}
      </div>
    </article>
  );
}

function CampoDetalhe({ title, lines }: CampoInformacao) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
      <p className="shrink-0 text-[15px] font-semibold text-[#1C1D1D]">
        {title}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[15px] font-medium text-[#1C1D1D]">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function SubtituloDetalhe({ children }: { children: ReactNode }) {
  return (
    <h4 className="text-start text-[16px] font-bold text-[#216587]">
      {children}
    </h4>
  );
}

function CartaoConvenioDetalhado({
  convenio,
  tituloRef,
}: {
  convenio: DadosConvenio;
  tituloRef?: Ref<HTMLHeadingElement>;
}) {
  const idTitulo = `convenio-${convenio.id}-titulo`;

  return (
    <article
      aria-labelledby={idTitulo}
      className="w-full rounded-[14px] bg-[#dde3e8] px-5 py-6 text-[#1C1D1D] shadow-[0_2px_4px_rgba(0,0,0,0.18)] md:px-12 md:py-8 lg:px-[78px]"
    >
      <h3
        id={idTitulo}
        ref={tituloRef}
        tabIndex={-1}
        className="text-start text-[18px] font-semibold text-[#1C1D1D] outline-none"
      >
        {convenio.sigla}
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-12">
        <div className="space-y-6 text-start">
          <div>
            <SubtituloDetalhe>Objeto da Parceria</SubtituloDetalhe>
            <p className="mt-2 text-[15px] leading-relaxed text-[#1C1D1D]">
              {convenio.objeto}
            </p>
          </div>

          <div>
            <SubtituloDetalhe>Informações</SubtituloDetalhe>
            <div className="mt-2 space-y-3">
              {convenio.informacoes.map((campo) => (
                <CampoDetalhe key={campo.title} {...campo} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {convenio.prestacaoMensal ? (
            <div className="flex flex-col items-center gap-3 rounded-[10px] bg-white/55 px-4 py-4 text-center sm:flex-row sm:justify-between sm:text-start">
              <p className="text-[15px] font-bold leading-tight text-[#1C1D1D]">
                Acesse aqui
                <br />a prestação de contas
              </p>
              <div className="w-full sm:w-[150px]">
                <LinkDownload {...convenio.prestacaoMensal} />
              </div>
            </div>
          ) : null}

          {convenio.grupos.map((grupo) => (
            <div key={grupo.title}>
              <SubtituloDetalhe>{grupo.title}</SubtituloDetalhe>
              <div
                className={`mt-3 grid gap-3 ${
                  grupo.variante === "anos"
                    ? "grid-cols-2 sm:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2"
                }`}
              >
                {grupo.links.map((link) => (
                  <LinkDownload key={link.label} {...link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile: os convênios abrem em acordeão logo abaixo do card          */
/* ------------------------------------------------------------------ */

function BotaoConvenioCompacto({
  convenio,
  aberto,
  onClick,
}: {
  convenio: DadosConvenio;
  aberto: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={aberto}
      aria-controls="convenio-detalhe-mobile"
      className={`group flex w-full items-center justify-between rounded-md border-2 border-[var(--verde)] px-4 py-3 text-sm font-semibold transition-colors duration-200 hover:bg-[var(--verde)] hover:text-white ${
        aberto ? "bg-[var(--verde)] text-white" : "text-[var(--verde)]"
      }`}
    >
      <span className="flex items-center gap-2">
        <FaChevronDown
          aria-hidden="true"
          className={`text-[0.75rem] transition-transform duration-300 ${
            aberto ? "rotate-180" : ""
          }`}
        />
        {convenio.rotuloBotao}
      </span>
      <span
        className={`text-[13px] font-medium group-hover:text-white ${
          aberto ? "text-white" : "text-[#6b6b6b]"
        }`}
      >
        {convenio.sigla}
      </span>
    </button>
  );
}

function SecaoTransparenciaMobile() {
  const cartaoInformacoes = cartoesTransparencia[0]!;
  const cartaoBalanco = cartoesTransparencia[1]!;
  const cartaoConvenios = cartoesTransparencia[2]!;

  const [convenioAberto, setConvenioAberto] = useState<ConvenioId | null>(
    null,
  );
  // Mantém o conteúdo renderizado enquanto o acordeão fecha.
  const [convenioExibido, setConvenioExibido] = useState<ConvenioId>("smpd");

  function alternarConvenio(id: ConvenioId) {
    if (convenioAberto === id) {
      setConvenioAberto(null);
      return;
    }
    setConvenioExibido(id);
    setConvenioAberto(id);
  }

  return (
    <section className="w-full overflow-hidden py-6 md:hidden">
      <TituloSecao {...secaoTransparencia} />

      <div className="mt-6 space-y-8 px-4">
        <CartaoDocumento {...cartaoInformacoes} />
        <CartaoDocumento {...cartaoBalanco} />

        <div>
          <CartaoDocumento
            {...cartaoConvenios}
            footer={
              <div className="flex flex-col gap-4">
                {convenios.map((convenio) => (
                  <BotaoConvenioCompacto
                    key={convenio.id}
                    convenio={convenio}
                    aberto={convenioAberto === convenio.id}
                    onClick={() => alternarConvenio(convenio.id)}
                  />
                ))}
              </div>
            }
          />

          <div
            id="convenio-detalhe-mobile"
            inert={convenioAberto === null}
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
              convenioAberto
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="pb-1 pt-4">
                <CartaoConvenioDetalhado
                  convenio={buscarConvenio(convenioExibido)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop: os convênios deslizam lateralmente sobre os cards          */
/* ------------------------------------------------------------------ */

function BotaoAbrirConvenio({
  convenio,
  onClick,
  botaoRef,
}: {
  convenio: DadosConvenio;
  onClick: () => void;
  botaoRef: Ref<HTMLButtonElement>;
}) {
  return (
    <button
      ref={botaoRef}
      type="button"
      onClick={onClick}
      aria-controls="convenio-detalhe-desktop"
      className="group inline-flex items-center justify-center gap-2 rounded-md border-2 border-[var(--verde)] px-4 py-2 text-sm font-semibold text-[var(--verde)] transition-colors duration-200 hover:bg-[var(--verde)] hover:text-white"
    >
      {convenio.rotuloBotao}
      <FaArrowRight
        aria-hidden="true"
        className="text-[0.75rem] transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </button>
  );
}

type AlvoFoco = "detalhe" | ConvenioId;

function SecaoTransparenciaDesktop() {
  const cartaoInformacoes = cartoesTransparencia[0]!;
  const cartaoBalanco = cartoesTransparencia[1]!;
  const cartaoConvenios = cartoesTransparencia[2]!;

  const [convenioAtivo, setConvenioAtivo] = useState<ConvenioId | null>(null);
  // Mantém o último convênio renderizado enquanto o painel desliza de volta.
  const [convenioExibido, setConvenioExibido] = useState<ConvenioId>("smpd");
  const [altura, setAltura] = useState<number>();

  const painelGeralRef = useRef<HTMLDivElement>(null);
  const painelDetalheRef = useRef<HTMLDivElement>(null);
  const tituloDetalheRef = useRef<HTMLHeadingElement>(null);
  const gatilhosRef = useRef<Partial<Record<ConvenioId, HTMLButtonElement>>>(
    {},
  );
  const focoPendente = useRef<AlvoFoco | null>(null);

  // Os dois painéis têm alturas diferentes: o trilho acompanha (com animação)
  // a altura do painel visível, para não sobrar espaço vazio abaixo dos cards.
  useLayoutEffect(() => {
    const alvo = convenioAtivo
      ? painelDetalheRef.current
      : painelGeralRef.current;
    if (!alvo) return;

    const atualizar = () => setAltura(alvo.offsetHeight);
    atualizar();

    const observador = new ResizeObserver(atualizar);
    observador.observe(alvo);
    return () => observador.disconnect();
  }, [convenioAtivo, convenioExibido]);

  // Leva o foco para o conteúdo novo (e de volta ao botão de origem),
  // sem rolar a página no meio da animação.
  useEffect(() => {
    const alvo = focoPendente.current;
    if (!alvo) return;
    focoPendente.current = null;

    if (alvo === "detalhe") {
      tituloDetalheRef.current?.focus({ preventScroll: true });
    } else {
      gatilhosRef.current[alvo]?.focus({ preventScroll: true });
    }
  }, [convenioAtivo]);

  function abrirConvenio(id: ConvenioId) {
    focoPendente.current = "detalhe";
    setConvenioExibido(id);
    setConvenioAtivo(id);
  }

  function voltarParaGeral() {
    focoPendente.current = convenioAtivo;
    setConvenioAtivo(null);
  }

  const detalheAberto = convenioAtivo !== null;

  return (
    <section className="hidden w-full overflow-hidden py-6 md:block">
      <TituloSecao {...secaoTransparencia} />

      <div
        className={`mt-5 overflow-hidden transition-[height] ${DURACAO_TRANSICAO} ease-in-out`}
        style={{ height: altura }}
      >
        <div
          className={`flex items-start transition-transform ${DURACAO_TRANSICAO} ease-in-out`}
          style={{
            width: "200%",
            transform: detalheAberto ? "translateX(-50%)" : "translateX(0%)",
          }}
        >
          <div
            ref={painelGeralRef}
            inert={detalheAberto}
            className="w-1/2 pb-2 pr-4"
          >
            <div className="mt-10 grid grid-cols-3 gap-[58px]">
              <CartaoDocumento {...cartaoInformacoes} />
              <CartaoDocumento {...cartaoBalanco} />
              <CartaoDocumento
                {...cartaoConvenios}
                footer={
                  <div className="flex flex-col gap-4">
                    {convenios.map((convenio) => (
                      <div key={convenio.id}>
                        <p className="text-center text-[13.5px] font-bold text-[#1C1D1D]">
                          {convenio.sigla}
                        </p>
                        <div className="mt-2 flex justify-center">
                          <BotaoAbrirConvenio
                            convenio={convenio}
                            onClick={() => abrirConvenio(convenio.id)}
                            botaoRef={(elemento) => {
                              if (elemento) {
                                gatilhosRef.current[convenio.id] = elemento;
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                }
              />
            </div>
          </div>

          <div
            ref={painelDetalheRef}
            id="convenio-detalhe-desktop"
            inert={!detalheAberto}
            onKeyDown={(evento) => {
              if (evento.key === "Escape") voltarParaGeral();
            }}
            className="w-1/2 pb-2 pl-4"
          >
            <div className="relative flex items-start justify-center px-2 py-4">
              <button
                type="button"
                onClick={voltarParaGeral}
                className={`absolute right-3 top-0 rounded-full border-2 border-[var(--verde)] px-3 py-1 text-xs font-semibold text-[var(--verde)] transition-all ${DURACAO_TRANSICAO} hover:bg-[var(--verde)] hover:text-white ${
                  detalheAberto
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
              >
                Voltar
              </button>
              <div className="w-full pt-8">
                <CartaoConvenioDetalhado
                  convenio={buscarConvenio(convenioExibido)}
                  tituloRef={tituloDetalheRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SecaoTransparencia() {
  return (
    <>
      <SecaoTransparenciaMobile />
      <SecaoTransparenciaDesktop />
    </>
  );
}
