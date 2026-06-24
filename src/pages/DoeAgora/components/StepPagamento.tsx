import { useState } from "react";
import type { DoacaoData } from "../index";
import StepIndicator from "./StepIndicator";
import { FiCreditCard, FiArrowLeft, FiLock } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";

interface StepPagamentoProps {
  dados: DoacaoData;
  onChange: (partial: Partial<DoacaoData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

type MetodoPagamento = "pix" | "cartao" | "boleto";

export default function StepPagamento({ dados, onChange, onNext, onBack, currentStep }: StepPagamentoProps) {
  const [metodo, setMetodo] = useState<MetodoPagamento>(dados.metodoPagamento);
  const [cartaoNumero, setCartaoNumero] = useState("");
  const [cartaoVencimento, setCartaoVencimento] = useState("");
  const [cartaoCvv, setCartaoCvv] = useState("");
  const [cartaoNome, setCartaoNome] = useState("");

  const handleMetodoChange = (m: MetodoPagamento) => {
    setMetodo(m);
    onChange({ metodoPagamento: m });
  };

  const handleContinuar = () => {
    if (metodo === "cartao") {
      onChange({
        cartao: {
          numero: cartaoNumero,
          vencimento: cartaoVencimento,
          cvv: cartaoCvv,
          nome: cartaoNome,
        },
      });
    }
    onNext();
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatVencimento = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const canProceed =
    metodo === "pix" ||
    metodo === "boleto" ||
    (metodo === "cartao" && cartaoNumero && cartaoVencimento && cartaoCvv && cartaoNome);

  const methods = [
    { key: "pix" as const, label: "PIX", Icon: BsQrCode },
    { key: "cartao" as const, label: "Cartão", Icon: FiCreditCard },
    { key: "boleto" as const, label: "Boleto", Icon: FiFileText },
  ];

  return (
    <div className="flex min-h-[70vh] w-full flex-col bg-white">

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-2 sm:px-8 sm:pt-8">
        <button
          onClick={onBack}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <FiArrowLeft size={16} />
        </button>

        {/* Donation value badge */}
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5">
          <span className="text-xs text-gray-500 font-medium">Doação</span>
          <span className="text-sm font-bold text-[#a9171a]">
            R$ {dados.valor.toFixed(2).replace(".", ",")}
          </span>
        </div>
      </div>

      {/* ── STEP INDICATOR ── */}
      <div className="px-5 sm:px-8 mt-2">
        <StepIndicator
          currentStep={currentStep}
          labels={["Valor", "Dados", "Pagamento"]}
        />
      </div>

      {/* ── CONTENT ── */}
      <div className="flex-1 px-5 pb-10 sm:px-0">
        <div className="w-full max-w-lg mx-auto sm:px-8">

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] mb-1 tracking-tight">
              FORMA DE PAGAMENTO
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Escolha como deseja apoiar nossa causa.
            </p>
          </div>

          {/* Payment method selector */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {methods.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => handleMetodoChange(key)}
                className={`flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-2 transition-all ${
                  metodo === key
                    ? "border-[#a9171a] bg-[#a9171a]/5 text-[#a9171a]"
                    : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                }`}
              >
                <Icon size={22} />
                <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
              </button>
            ))}
          </div>

          {/* PIX info block */}
          {metodo === "pix" && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Ao continuar, você receberá um <strong className="text-gray-700">QR Code</strong> e{" "}
                <strong className="text-gray-700">código copia e cola</strong> para finalizar o pagamento.
              </p>
            </div>
          )}

          {/* Boleto info block */}
          {metodo === "boleto" && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Um boleto será gerado com vencimento em <strong className="text-gray-700">3 dias úteis</strong>.
                O pagamento pode ser feito em qualquer banco ou lotérica.
              </p>
            </div>
          )}

          {/* Card form */}
          {metodo === "cartao" && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Número do cartão
                </label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cartaoNumero}
                  onChange={(e) => setCartaoNumero(formatCardNumber(e.target.value))}
                  className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#a9171a] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Vencimento
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={cartaoVencimento}
                    onChange={(e) => setCartaoVencimento(formatVencimento(e.target.value))}
                    className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#a9171a] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="000"
                    value={cartaoCvv}
                    onChange={(e) => setCartaoCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#a9171a] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Nome impresso no cartão
                </label>
                <input
                  type="text"
                  placeholder="NOME COMPLETO"
                  value={cartaoNome}
                  onChange={(e) => setCartaoNome(e.target.value.toUpperCase())}
                  className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#a9171a] transition-colors"
                />
              </div>
            </div>
          )}

          {/* Donation summary line */}
          <div className="flex justify-between items-center py-4 border-t border-b border-gray-100 mb-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Doação única</span>
            <span className="text-xl font-extrabold text-[#1a1a1a]">
              R$ {dados.valor.toFixed(2).replace(".", ",")}
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={handleContinuar}
            disabled={!canProceed}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-base tracking-wide transition-all ${
              canProceed
                ? "bg-[#216587] hover:bg-[#1a4f6b] cursor-pointer"
                : "bg-[#216587]/40 cursor-not-allowed"
            }`}
          >
            CONTINUAR
            <span className="text-lg">→</span>
          </button>

          {/* Security note */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            <FiLock size={11} className="text-gray-300" />
            <p className="text-[10px] text-gray-300 text-center">
              Pagamento seguro com criptografia SSL.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
