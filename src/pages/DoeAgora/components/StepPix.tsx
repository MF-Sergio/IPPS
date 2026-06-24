import type { DoacaoData } from "../index";
import { FiCopy, FiCheckCircle, FiX } from "react-icons/fi";
import { useState } from "react";

interface StepPixProps {
  dados: DoacaoData;
  onVoltar: () => void;
}

export default function StepPix({ dados, onVoltar }: StepPixProps) {
  const [copied, setCopied] = useState(false);

  const pixCode = "00020126580014br.gov.bcb.pix0136ippromocaodasaude@gmail.com5204000053039865802BR";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex min-h-[70vh] w-full flex-col bg-white">

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2 sm:px-8 sm:pt-8">
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">
            Resumo da doação
          </p>
          <p className="text-xl font-extrabold text-[#a9171a]">
            R$ {dados.valor.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <button
          onClick={onVoltar}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
        >
          <FiX size={16} />
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 px-5 pb-10 sm:px-0">
        <div className="w-full max-w-lg mx-auto sm:px-8">

          {/* Title */}
          <div className="text-center mb-6 mt-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] mb-2 tracking-tight">
              FINALIZE COM PIX
            </h2>
            <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed">
              Abra o app do seu banco, escolha PIX e escaneie o código abaixo.
            </p>
          </div>

          {/* Dynamic QR badge */}
          <div className="flex justify-center mb-4">
            <span className="bg-[#a9171a] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              QR Code Dinâmico
            </span>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="w-44 h-44 sm:w-52 sm:h-52 bg-white border-2 border-gray-100 rounded-2xl flex items-center justify-center p-4 shadow-sm">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect width="100" height="100" fill="white" />
                <rect x="5" y="5" width="25" height="25" fill="black" />
                <rect x="8" y="8" width="19" height="19" fill="white" />
                <rect x="11" y="11" width="13" height="13" fill="black" />
                <rect x="70" y="5" width="25" height="25" fill="black" />
                <rect x="73" y="8" width="19" height="19" fill="white" />
                <rect x="76" y="11" width="13" height="13" fill="black" />
                <rect x="5" y="70" width="25" height="25" fill="black" />
                <rect x="8" y="73" width="19" height="19" fill="white" />
                <rect x="11" y="76" width="13" height="13" fill="black" />
                <rect x="35" y="5" width="5" height="5" fill="black" />
                <rect x="45" y="5" width="5" height="5" fill="black" />
                <rect x="55" y="5" width="5" height="5" fill="black" />
                <rect x="35" y="15" width="5" height="5" fill="black" />
                <rect x="50" y="15" width="5" height="5" fill="black" />
                <rect x="60" y="15" width="5" height="5" fill="black" />
                <rect x="40" y="25" width="5" height="5" fill="black" />
                <rect x="50" y="25" width="5" height="5" fill="black" />
                <rect x="35" y="35" width="5" height="5" fill="black" />
                <rect x="45" y="35" width="5" height="5" fill="black" />
                <rect x="55" y="35" width="5" height="5" fill="black" />
                <rect x="65" y="35" width="5" height="5" fill="black" />
                <rect x="75" y="35" width="5" height="5" fill="black" />
                <rect x="85" y="35" width="5" height="5" fill="black" />
                <rect x="5" y="35" width="5" height="5" fill="black" />
                <rect x="15" y="35" width="5" height="5" fill="black" />
                <rect x="25" y="35" width="5" height="5" fill="black" />
                <rect x="40" y="45" width="5" height="5" fill="black" />
                <rect x="55" y="45" width="5" height="5" fill="black" />
                <rect x="65" y="45" width="5" height="5" fill="black" />
                <rect x="75" y="45" width="5" height="5" fill="black" />
                <rect x="35" y="55" width="5" height="5" fill="black" />
                <rect x="50" y="55" width="5" height="5" fill="black" />
                <rect x="60" y="55" width="5" height="5" fill="black" />
                <rect x="75" y="55" width="5" height="5" fill="black" />
                <rect x="85" y="55" width="5" height="5" fill="black" />
                <rect x="40" y="65" width="5" height="5" fill="black" />
                <rect x="55" y="65" width="5" height="5" fill="black" />
                <rect x="65" y="65" width="5" height="5" fill="black" />
                <rect x="35" y="75" width="5" height="5" fill="black" />
                <rect x="50" y="75" width="5" height="5" fill="black" />
                <rect x="70" y="70" width="5" height="5" fill="black" />
                <rect x="80" y="70" width="5" height="5" fill="black" />
                <rect x="90" y="70" width="5" height="5" fill="black" />
                <rect x="70" y="80" width="5" height="5" fill="black" />
                <rect x="85" y="80" width="5" height="5" fill="black" />
                <rect x="70" y="90" width="5" height="5" fill="black" />
                <rect x="80" y="90" width="5" height="5" fill="black" />
                <rect x="90" y="90" width="5" height="5" fill="black" />
              </svg>
            </div>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm tracking-wide transition-all mb-3 ${
              copied
                ? "bg-green-600 text-white"
                : "bg-[#216587] hover:bg-[#1a4f6b] text-white"
            }`}
          >
            {copied ? <FiCheckCircle size={18} /> : <FiCopy size={18} />}
            {copied ? "CÓDIGO COPIADO!" : "COPIAR CÓDIGO PIX"}
          </button>

          {/* Expiry notice */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 mb-7 border border-gray-100">
            <FiCheckCircle size={14} className="text-green-500 shrink-0" />
            <p className="text-[11px] text-gray-400 leading-snug">
              O código expira em <strong className="text-gray-600">30 minutos</strong>. Após o pagamento, a confirmação é imediata.
            </p>
          </div>

          {/* Instructions */}
          <div className="space-y-5">
            {[
              {
                num: "01",
                title: "COPIE O CÓDIGO OU ESCANEIE",
                desc: "Use a câmera ou o código acima para capturar os dados.",
              },
              {
                num: "02",
                title: "CONFIRME OS DADOS",
                desc: 'Verifique se o destinatário é "Editorial Philanthropy".',
              },
              {
                num: "03",
                title: "PRONTO!",
                desc: "Seu impacto começou! Avise que o pagamento foi processado.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="flex items-start gap-4">
                <span className="text-xs font-extrabold text-[#a9171a] pt-0.5 w-5 shrink-0">{num}</span>
                <div>
                  <p className="text-xs font-bold text-[#1a1a1a] mb-0.5">{title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
