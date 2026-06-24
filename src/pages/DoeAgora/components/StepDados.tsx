import { FiLock } from "react-icons/fi";
import type { DoacaoData } from "../index";
import StepIndicator from "./StepIndicator";

interface StepDadosProps {
  dados: DoacaoData;
  onChange: (partial: Partial<DoacaoData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

export default function StepDados({
  dados,
  onChange,
  onNext,
  currentStep,
}: StepDadosProps) {
  const canProceed = dados.nome.trim() && dados.email.trim() && dados.cpf.trim();

  const formatCPF = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <section className="flex w-full justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-200.25 rounded-[20px] border border-[#E7E1E3] bg-white px-8 py-12 text-left shadow-[0_18px_48px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-140 text-center">
          <h2 className="font-serif text-[32px] font-bold leading-tight text-[#1C1D1D]">
            SEUS DADOS
          </h2>
          <p className="mx-auto mt-4 max-w-105 text-[13px] leading-relaxed tracking-[0.04em] text-[#6f6368]">
            Sua generosidade transforma vidas. Precisamos de algumas
            informações básicas para registrar sua contribuição.
          </p>
        </div>

        <div className="mt-9 w-full">
          <StepIndicator
            currentStep={currentStep}
            labels={["Valor", "Dados", "Pagamento"]}
          />
        </div>

        <div className="mt-9 w-full space-y-7">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
              Nome Completo
            </label>
            <input
              type="text"
              placeholder="Como devemos chamar você?"
              value={dados.nome}
              onChange={(event) => onChange({ nome: event.target.value })}
              className="mt-2 h-12 w-full rounded-md border-0 bg-[#F5F3F3] px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:bg-white focus:ring-2 focus:ring-[#a9171a]/30"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={dados.email}
              onChange={(event) => onChange({ email: event.target.value })}
              className="mt-2 h-12 w-full rounded-md border-0 bg-[#F5F3F3] px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:bg-white focus:ring-2 focus:ring-[#a9171a]/30"
            />
          </div>

          <div className="max-w-75">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
              CPF
            </label>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={dados.cpf}
              onChange={(event) =>
                onChange({ cpf: formatCPF(event.target.value) })
              }
              className="mt-2 h-12 w-full rounded-md border-0 bg-[#F5F3F3] px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:bg-white focus:ring-2 focus:ring-[#a9171a]/30"
            />
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`mx-auto mt-12 flex h-12.5 w-full max-w-85 items-center justify-center gap-2 rounded-lg text-[13px] font-bold uppercase tracking-wide text-white transition-all ${
            canProceed ? "bg-[#216587] hover:bg-[#1a4f6b]" : "bg-[#216587]/45"
          }`}
        >
          Próximo
          <span className="text-lg leading-none">→</span>
        </button>

        <div className="mt-6 flex items-center justify-center gap-1.5">
          <FiLock size={11} className="text-[#BFC5CC]" />
          <p className="text-center text-[10px] text-[#8c98a3]">
            Ao continuar, você concorda com nossos termos de privacidade. Seus
            dados estão seguros e protegidos por criptografia de ponta a ponta.
          </p>
        </div>
      </div>
    </section>
  );
}
