import { useState } from "react";
import {
  FiCalendar,
  FiCheckCircle,
  FiCopy,
  FiExternalLink,
  FiShield,
} from "react-icons/fi";
import type { DoacaoData, DoacaoResposta } from "../../index";

interface StepBoletoProps {
  dados: DoacaoData;
  payment: DoacaoResposta;
  onVoltar: () => void;
}

export default function StepBoleto({ dados, payment }: StepBoletoProps) {
  const [copied, setCopied] = useState(false);
  const formattedValue = dados.valor.toFixed(2).replace(".", ",");
  const boleto = payment.boleto;

  if (!boleto) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(boleto.linhaDigitavel);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const abrirBoleto = () => {
    if (boleto.url) {
      window.open(boleto.url, "_blank", "noopener,noreferrer");
    }
  };

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
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDEEF5] text-[#216587]">
            <FiCalendar size={18} />
          </span>
        </div>

        <div className="mt-10 text-center">
          <h2 className="font-serif text-[28px] font-bold uppercase leading-tight text-[#1C1D1D]">
            Finalize com Boleto
          </h2>
          <p className="mx-auto mt-2 max-w-85 text-[12px] leading-relaxed text-[#6f6368]">
            O boleto será emitido em nome da sua doação e pode ser pago em
            qualquer agência bancária, internet banking ou app do banco.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <span className="rounded-full bg-[#5A100F] px-4 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
            Código de barras disponível
          </span>
        </div>

        <div className="mt-6 rounded-2xl border border-[#E7E1E3] bg-[#F8F8F8] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#4d4045]">
            Linha digitável
          </p>
          <p className="mt-2 break-all text-[12px] font-semibold leading-relaxed text-[#1C1D1D]">
            {boleto.linhaDigitavel}
          </p>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.08em] text-[#4d4045]">
            Código de barras
          </p>
          <p className="mt-2 break-all text-[12px] font-medium leading-relaxed text-[#566070]">
            {boleto.codigoBarras ||
              "Código de barras não disponível no retorno atual."}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleCopy}
            className={`flex h-11.5 items-center justify-center gap-2 rounded-lg text-[12px] font-bold uppercase tracking-wide text-white transition-colors ${
              copied ? "bg-green-600" : "bg-[#216587] hover:bg-[#1a4f6b]"
            }`}
          >
            {copied ? <FiCheckCircle size={16} /> : <FiCopy size={16} />}
            {copied ? "Linha copiada" : "Copiar linha"}
          </button>

          <button
            type="button"
            onClick={abrirBoleto}
            className="flex h-11.5 items-center justify-center gap-2 rounded-lg border border-[#D7DCDF] bg-white text-[12px] font-bold uppercase tracking-wide text-[#1C1D1D] transition-colors hover:bg-[#F5F3F3]"
          >
            <FiExternalLink size={16} />
            Ver boleto
          </button>
        </div>

        <div className="mt-6 rounded-full bg-[#F1F0EF] px-5 py-3 text-center text-[11px] leading-relaxed text-[#6f7680]">
          Vencimento: <strong>{boleto.vencimento}</strong>. Após o pagamento, a
          confirmação pode levar alguns minutos.
        </div>

        <div className="mt-9 flex items-center justify-center gap-1.5 text-[#BFC5CC]">
          <FiShield size={12} />
          <p className="text-[10px]">Ambiente protegido para sua doação.</p>
        </div>
      </div>
    </section>
  );
}
