import type { DoacaoData } from "../index";
import { FiHeart, FiShare2, FiCopy, FiCheckCircle } from "react-icons/fi";

interface StepConfirmacaoProps {
  dados: DoacaoData;
  onVoltar: () => void;
}

export default function StepConfirmacao({ dados, onVoltar }: StepConfirmacaoProps) {
  const transactionId = `#RC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <div className="flex min-h-[70vh] w-full flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-10 sm:px-0">
        <div className="w-full max-w-lg mx-auto sm:px-8 text-center">

          {/* Heart icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 bg-[#216587] rounded-full flex items-center justify-center shadow-lg">
              <FiHeart size={28} className="text-white" fill="white" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] mb-2 tracking-tight">
            OBRIGADO POR SUA DOAÇÃO!
          </h2>
          <p className="text-sm text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">
            Sua generosidade está criando um impacto real agora mesmo.
          </p>

          {/* Donation details card */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 text-left mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Valor Doado</span>
              <span className="text-2xl font-extrabold text-[#a9171a]">
                R$ {dados.valor.toFixed(2).replace(".", ",")}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex items-start gap-3">
                <FiCheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-[#1a1a1a]">Transação Confirmada</p>
                  <p className="text-xs text-gray-400 mt-0.5">ID: {transactionId}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-4.5 h-4.5 bg-gray-200 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                  ✉
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Um recibo detalhado foi enviado para <strong className="text-gray-600">{dados.email || "seu e-mail"}</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Home button */}
          <button
            onClick={onVoltar}
            className="w-full sm:w-auto sm:px-16 flex items-center justify-center gap-2 py-4 bg-[#a9171a] hover:bg-[#8a1216] text-white rounded-xl font-bold text-sm tracking-wide transition-colors mb-6"
          >
            PÁGINA INICIAL
            <span className="text-base">→</span>
          </button>

          {/* Share section */}
          <div className="mt-2">
            <p className="text-[10px] text-gray-300 uppercase font-bold tracking-wider mb-3">
              Compartilhe sua boa ação
            </p>
            <div className="flex justify-center gap-3">
              <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <FiShare2 size={16} />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                <FiCopy size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
