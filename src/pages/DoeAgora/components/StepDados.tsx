import type { DoacaoData } from "../index";
import StepIndicator from "./StepIndicator";
import { FiArrowLeft, FiLock } from "react-icons/fi";

interface StepDadosProps {
  dados: DoacaoData;
  onChange: (partial: Partial<DoacaoData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

export default function StepDados({ dados, onChange, onNext, onBack, currentStep }: StepDadosProps) {
  const canProceed = dados.nome.trim() && dados.email.trim() && dados.cpf.trim();

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

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

      {/* ── FORM ── */}
      <div className="flex-1 px-5 pb-10 sm:px-0">
        <div className="w-full max-w-lg mx-auto sm:px-8">

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] mb-1 tracking-tight">
              SEUS DADOS
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Precisamos de algumas informações básicas para registrar sua contribuição.
            </p>
          </div>

          <div className="space-y-5">
            {/* Nome */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                Nome Completo
              </label>
              <input
                type="text"
                placeholder="Como devemos chamar você?"
                value={dados.nome}
                onChange={(e) => onChange({ nome: e.target.value })}
                className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#a9171a] transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={dados.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#a9171a] transition-colors"
              />
            </div>

            {/* CPF */}
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                CPF
              </label>
              <input
                type="text"
                placeholder="000.000.000-00"
                value={dados.cpf}
                onChange={(e) => onChange({ cpf: formatCPF(e.target.value) })}
                className="w-full py-3.5 px-4 border-2 border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-[#a9171a] transition-colors"
              />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white text-base tracking-wide transition-all ${
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
              Seus dados estão protegidos com criptografia SSL de ponta a ponta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
