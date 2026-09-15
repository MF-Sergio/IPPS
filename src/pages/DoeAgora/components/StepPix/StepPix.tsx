import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiHeart,
  FiRefreshCw,
  FiShield,
  FiXCircle,
} from "react-icons/fi";
import type { DoacaoData } from "../../index";
import type { DoacaoResposta } from "../../index";
import {
  consultarStatusDoacao,
  type StatusDoacao,
} from "../../services/doacaoApi";

interface StepPixProps {
  dados: DoacaoData;
  payment: DoacaoResposta;
  onVoltar: () => void;
}

const instructions = [
  {
    num: "01",
    title: "COPIE O CÓDIGO OU ESCANEIE",
    desc: "Use a câmera ou o botão acima para capturar os dados.",
  },
  {
    num: "02",
    title: "CONFIRME OS DADOS",
    desc: "Verifique os dados do recebedor antes de confirmar no seu banco.",
  },
  {
    num: "03",
    title: "PRONTO!",
    desc: "Seu impacto começará assim que o pagamento for processado.",
  },
];

export default function StepPix({ dados, payment }: StepPixProps) {
  // criarDoacao valida o bloco Pix antes de renderizar este componente.
  const pix = payment.pix!;

  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<StatusDoacao>(
    payment.status as StatusDoacao,
  );
  const [remainingMs, setRemainingMs] = useState(() =>
    getRemainingMs(pix.expiraEm),
  );
  const [statusError, setStatusError] = useState<string | null>(null);
  const formattedValue = dados.valor.toFixed(2).replace(".", ",");
  const expired = remainingMs <= 0 || status === "expirada";

  useEffect(() => {
    const expirationTimer = window.setInterval(() => {
      setRemainingMs(getRemainingMs(pix.expiraEm));
    }, 1000);

    return () => window.clearInterval(expirationTimer);
  }, [pix.expiraEm]);

  useEffect(() => {
    if (isTerminalStatus(status) || expired) return;

    let disposed = false;
    let requestInFlight = false;
    const controller = new AbortController();

    const refreshStatus = async () => {
      if (disposed || requestInFlight) return;
      requestInFlight = true;

      try {
        const response = await consultarStatusDoacao(
          payment.id,
          controller.signal,
        );
        if (!disposed) {
          setStatus(response.status);
          setStatusError(null);
        }
      } catch (error) {
        if (
          !disposed &&
          !(error instanceof DOMException && error.name === "AbortError")
        ) {
          setStatusError("Não foi possível atualizar o status agora.");
        }
      } finally {
        requestInFlight = false;
      }
    };

    void refreshStatus();
    const pollingTimer = window.setInterval(() => void refreshStatus(), 10000);

    return () => {
      disposed = true;
      controller.abort();
      window.clearInterval(pollingTimer);
    };
  }, [payment.id, pix.expiraEm, status, expired]);

  // Aguardando confirmar se o campo QrCodeString sera sempre o payload Pix
  // copia e cola completo em todos os providers habilitados para a conta.
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pix.qrCodeString);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      setStatusError("Não foi possível copiar o código Pix.");
    }
  };

  const displayStatus = expired ? "expirada" : status;
  const statusContent = getStatusContent(displayStatus);
  const StatusIcon = statusContent.Icon;

  return (
    <section className="flex w-full justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-160 rounded-[18px] border border-[#E7E8EB] bg-white px-5 py-6 shadow-[0_18px_48px_rgba(0,0,0,0.03)] sm:px-6 sm:py-7">
        <div className="flex items-start justify-between rounded-2xl bg-white px-2 pb-7 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
          <div>
            <p className="font-serif text-[13px] uppercase tracking-wide text-[#4d4045]">
              Resumo da doação
            </p>
            <p className="mt-2 text-[18px] font-extrabold text-[#A40201]">
              R$ {formattedValue}
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A9C6D0] text-[#216587]">
            <FiHeart fill="#216587" size={18} />
          </span>
        </div>

        <div className="mt-10 text-center">
          <h2 className="font-serif text-[28px] font-bold uppercase leading-tight text-[#1C1D1D]">
            Finalize com Pix
          </h2>
          <p className="mx-auto mt-2 max-w-75 text-[12px] leading-relaxed text-[#6f6368]">
            Abra o app do seu banco e escolha a opção PIX para realizar o
            pagamento.
          </p>
        </div>

        <div
          className={`mt-6 rounded-xl border px-4 py-3 text-center ${statusContent.className}`}
        >
          <div className="flex items-center justify-center gap-2">
            <StatusIcon size={16} />
            <p className="text-[12px] font-bold uppercase tracking-wide">
              {statusContent.title}
            </p>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed">
            {statusContent.description}
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <span className="rounded-full bg-[#5A100F] px-4 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
            QR Code Dinâmico
          </span>
        </div>

        <div
          className={`mt-5 flex justify-center ${expired ? "opacity-45" : ""}`}
        >
          <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_42px_rgba(0,0,0,0.08)]">
            <div className="rounded bg-[#242020] p-5 shadow-[7px_7px_0_rgba(0,0,0,0.25)]">
              <img
                src={`data:image/png;base64,${pix.qrCodeBase64}`}
                alt="QR Code para pagamento via Pix"
                className="h-35.5 w-35.5 object-contain"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          disabled={expired}
          className={`mt-8 flex h-11.5 w-full items-center justify-center gap-2 rounded-lg text-[12px] font-bold uppercase tracking-wide text-white transition-colors ${
            copied ? "bg-green-600" : "bg-[#216587] hover:bg-[#1a4f6b]"
          } disabled:cursor-not-allowed disabled:bg-[#9aa7ad]`}
        >
          {copied ? <FiCheckCircle size={16} /> : <FiCopy size={16} />}
          {copied ? "Código copiado" : "Copiar código PIX"}
        </button>

        <div className="mt-4 flex items-center gap-3 rounded-full bg-[#F1F0EF] px-5 py-3">
          <FiClock className="shrink-0 text-[#216587]" size={16} />
          <p className="text-[11px] leading-relaxed text-[#6f7680]">
            {expired ? (
              <strong>Este QR Code expirou. Inicie uma nova doação.</strong>
            ) : (
              <>
                O código expira em{" "}
                <strong>{formatRemaining(remainingMs)}</strong>. A confirmação
                será atualizada automaticamente.
              </>
            )}
          </p>
        </div>

        {statusError && (
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#8c98a3]">
            <FiRefreshCw size={12} />
            <p>{statusError}</p>
          </div>
        )}

        <div className="mt-14 space-y-7">
          {instructions.map(({ num, title, desc }) => (
            <div key={num} className="grid grid-cols-[34px_1fr] gap-5">
              <span className="font-serif text-[20px] font-bold italic text-[#D77777]">
                {num}
              </span>
              <div>
                <p className="font-serif text-[14px] font-bold uppercase leading-tight text-[#1C1D1D] text-left">
                  {title}
                </p>
                <p className="mt-1 max-w-62.5 text-[10px] leading-relaxed text-[#566070] text-left">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex items-center justify-center gap-1.5 text-[#BFC5CC]">
          <FiShield size={12} />
          <p className="text-[10px]">Ambiente protegido para sua doação.</p>
        </div>
      </div>
    </section>
  );
}

function getRemainingMs(expiraEm: string): number {
  const expirationTime = new Date(expiraEm).getTime();
  if (!Number.isFinite(expirationTime)) return 0;
  return Math.max(0, expirationTime - Date.now());
}

function formatRemaining(remainingMs: number): string {
  const totalMinutes = Math.ceil(remainingMs / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}min`;
  return `${String(minutes).padStart(2, "0")} minutos`;
}

function isTerminalStatus(value: StatusDoacao): boolean {
  return ["confirmada", "negada", "cancelada", "falhou", "expirada"].includes(
    value,
  );
}

function getStatusContent(status: StatusDoacao) {
  if (status === "confirmada") {
    return {
      Icon: FiCheckCircle,
      title: "Pagamento confirmado",
      description: "Recebemos a confirmação do seu pagamento Pix.",
      className: "border-[#B7DFC9] bg-[#F0FAF4] text-[#237044]",
    };
  }

  if (status === "expirada") {
    return {
      Icon: FiXCircle,
      title: "QR Code expirado",
      description: "Este código não pode mais ser utilizado.",
      className: "border-[#F2B8B5] bg-[#FFF4F2] text-[#A40201]",
    };
  }

  if (["negada", "cancelada", "falhou"].includes(status)) {
    return {
      Icon: FiXCircle,
      title: "Pagamento não concluído",
      description: "Não foi possível confirmar este pagamento.",
      className: "border-[#F2B8B5] bg-[#FFF4F2] text-[#A40201]",
    };
  }

  return {
    Icon: FiClock,
    title: "Pagamento pendente",
    description: "Aguardando a confirmação do banco.",
    className: "border-[#D9E4EA] bg-[#F5FAFC] text-[#216587]",
  };
}
