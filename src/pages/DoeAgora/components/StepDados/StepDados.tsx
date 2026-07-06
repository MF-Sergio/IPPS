import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { DoacaoData } from "../../index";
import StepIndicator from "../StepIndicator/StepIndicator";

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
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(dados.email.trim());
  const canProceed =
    dados.nome.trim().length >= 3 && emailValido && dados.aceitePrivacidade;

  return (
    <section className="flex w-full justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-200.25 rounded-[20px] border border-[#E7E1E3] bg-white px-8 py-12 text-left shadow-[0_18px_48px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-140 text-center">
          <h2 className="font-serif text-[32px] font-bold leading-tight text-[#1C1D1D]">
            SEUS DADOS
          </h2>
          <p className="mx-auto mt-4 max-w-105 text-[13px] leading-relaxed tracking-[0.04em] text-[#6f6368]">
            Sua generosidade transforma vidas. Precisamos de algumas informações
            básicas para iniciar sua contribuição com segurança.
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

          <label className="flex items-start gap-3 rounded-lg border border-[#E7E1E3] bg-[#FAF8F8] px-4 py-4 text-left">
            <input
              type="checkbox"
              checked={dados.aceitePrivacidade}
              onChange={(event) =>
                onChange({ aceitePrivacidade: event.target.checked })
              }
              className="mt-1 h-4 w-4 accent-[#216587]"
            />
            <span className="text-[11px] leading-relaxed text-[#6f6368]">
              Li e concordo com a{" "}
              <Link
                to="/politica-de-privacidade"
                className="font-bold text-[#216587] underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Política de Privacidade
              </Link>
              . Entendo que meus dados serão usados apenas para processar esta
              doação e comunicações relacionadas.
            </span>
          </label>
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
            O pagamento será concluído no ambiente seguro do Mercado Pago. O
            IPPS não coleta dados de cartão.
          </p>
        </div>
      </div>
    </section>
  );
}
