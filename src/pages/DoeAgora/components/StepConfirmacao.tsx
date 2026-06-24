import {
  FiCheckCircle,
  FiCopy,
  FiHeart,
  FiMail,
  FiShare2,
} from "react-icons/fi";
import type { DoacaoData } from "../index";

interface StepConfirmacaoProps {
  dados: DoacaoData;
  onVoltar: () => void;
}

export default function StepConfirmacao({
  dados,
  onVoltar,
}: StepConfirmacaoProps) {
  const transactionId = `#RC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const formattedValue = dados.valor.toFixed(2).replace(".", ",");

  return (
    <section className="flex w-full justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-270 rounded-[20px] bg-white px-8 py-12 text-center shadow-[0_18px_48px_rgba(0,0,0,0.03)] sm:px-24 sm:py-16">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-white shadow-[0_20px_42px_rgba(33,101,135,0.14)]">
          <FiHeart className="text-[#216587]" fill="#216587" size={48} />
        </div>

        <h2 className="mx-auto mt-10 max-w-77.5 font-serif text-[22px] font-bold uppercase leading-tight text-[#1C1D1D]">
          Obrigado por sua doação!
        </h2>

        <p className="mx-auto mt-6 max-w-82.5 text-[13px] leading-relaxed tracking-[0.04em] text-[#6f6368]">
          Sua generosidade está criando um impacto real agora mesmo.
        </p>

        <div className="mx-auto mt-10 w-full max-w-190 rounded-[18px] border border-[#E7E8EB] bg-white p-6 text-left">
          <div className="flex items-center justify-between gap-5 border-b border-[#E6E8EB] pb-5">
            <span className="font-serif text-[13px] uppercase tracking-wide text-[#4d4045]">
              Valor doado
            </span>
            <strong className="text-[22px] font-extrabold text-[#A40201]">
              R$ {formattedValue}
            </strong>
          </div>

          <div className="mt-5 flex items-start gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D8E7EC] text-[#216587]">
              <FiCheckCircle size={16} />
            </span>
            <div>
              <p className="text-[12px] font-bold text-black">
                Transação Confirmada
              </p>
              <p className="mt-1 text-[11px] text-[#6f7680]">
                ID: {transactionId}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-lg bg-[#F5F3F3] px-4 py-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border border-[#D8D8D8] text-[#7d7d7d]">
              <FiMail size={12} />
            </span>
            <p className="text-[12px] text-[#6f6368]">
              Um recibo detalhado foi enviado para seu e-mail cadastrado.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onVoltar}
          className="mx-auto mt-8 flex h-11 w-full max-w-62.5 items-center justify-center gap-2 rounded-lg bg-[#A40201] text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#880000]"
        >
          Página inicial
          <span className="text-lg leading-none">→</span>
        </button>

        <div className="mx-auto mt-8 flex max-w-190 items-center gap-4">
          <span className="h-px flex-1 bg-[#ECE7E7]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b7b7f]">
            Compartilhe sua boa ação
          </span>
          <span className="h-px flex-1 bg-[#ECE7E7]" />
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="button"
            aria-label="Compartilhar"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEEFF2] bg-white text-[#6f7680] transition-colors hover:text-[#216587]"
          >
            <FiShare2 size={16} />
          </button>
          <button
            type="button"
            aria-label="Copiar"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EEEFF2] bg-white text-[#6f7680] transition-colors hover:text-[#216587]"
          >
            <FiCopy size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
