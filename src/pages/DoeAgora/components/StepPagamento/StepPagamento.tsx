import { useState } from "react";
import { FiCreditCard, FiLock } from "react-icons/fi";
import type { DoacaoData } from "../../index";
import StepIndicator from "../StepIndicator/StepIndicator";

interface StepPagamentoProps {
  dados: DoacaoData;
  onChange: (partial: Partial<DoacaoData>) => void;
  onSubmit: (metodoPagamento: MetodoPagamento) => void;
  isSubmitting: boolean;
  error: string | null;
  onBack: () => void;
  currentStep: number;
}

type MetodoPagamento = "pix" | "cartao" | "boleto";

// Aguardando a Cielo confirmar os campos obrigatorios e o fluxo de captura
// para cartao e boleto; nesta etapa somente o Pix esta integrado ao backend.
const iconPath = "/img/donation-icons";

export default function StepPagamento({
  dados,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  currentStep,
}: StepPagamentoProps) {
  const [metodo, setMetodo] = useState<MetodoPagamento>(dados.metodoPagamento);

  const methods = [
    { key: "pix" as const, label: "PIX", iconSrc: `${iconPath}/pix-icon.svg` },
    { key: "cartao" as const, label: "Cartão", Icon: FiCreditCard },
    {
      key: "boleto" as const,
      label: "Boleto",
      iconSrc: `${iconPath}/boleto-icon.svg`,
    },
  ];

  const handleMetodoChange = (selectedMethod: MetodoPagamento) => {
    setMetodo(selectedMethod);
    onChange({ metodoPagamento: selectedMethod });
  };

  const handleContinuar = () => {
    onChange({ metodoPagamento: metodo });
    onSubmit(metodo);
  };

  const isBoletoSelected = metodo === "boleto";

  const formattedValue = dados.valor.toFixed(2).replace(".", ",");
  const paymentDescription = getPaymentDescription(metodo);

  return (
    <section className="flex w-full justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-200.25 rounded-[20px] border border-[#E7E1E3] bg-white px-8 py-12 text-left shadow-[0_18px_48px_rgba(0,0,0,0.06)]">
        <div className="mx-auto max-w-140 text-center">
          <h2 className="font-serif text-[26px] font-bold leading-tight text-[#A40201]">
            FORMA DE PAGAMENTO
          </h2>
          <p className="mx-auto mt-4 max-w-82.5 text-[12px] leading-relaxed tracking-[0.04em] text-[#6f6368]">
            Sua contribuição transforma realidades. Escolha como deseja apoiar
            nossa causa.
          </p>
        </div>

        <div className="mt-8 w-full">
          <StepIndicator
            currentStep={currentStep}
            labels={["Valor", "Dados", "Pagamento", "Confirmação"]}
          />
        </div>

        <div className="mx-auto mt-9 w-full max-w-130">
          <div className="flex items-center justify-start gap-5">
            {methods.map(({ key, label, iconSrc, Icon }) => {
              const isSelected = metodo === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleMetodoChange(key)}
                  className={`flex h-18.5 w-18.5 flex-col items-center justify-center gap-2 rounded-2xl border transition-all ${
                    isSelected
                      ? "border-[#a9171a] bg-[#a9171a] text-white shadow-[0_8px_18px_rgba(164,2,1,0.18)]"
                      : "border-transparent bg-[#F5F3F3] text-[#6d7480] hover:border-[#D8DDE4]"
                  }`}
                >
                  {iconSrc ? (
                    <img
                      src={iconSrc}
                      alt=""
                      aria-hidden="true"
                      className={`h-5 w-5 object-contain ${
                        isSelected ? "brightness-0 invert" : "opacity-75"
                      }`}
                    />
                  ) : (
                    Icon && <Icon size={21} strokeWidth={2.4} />
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em]">
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-7 rounded-xl border border-[#ECEFF3] bg-[#F8F8F8] px-6 py-5 text-center">
            <p className="text-[12px] font-bold uppercase tracking-wide text-[#1d2a38]">
              {paymentDescription.title}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[#566070]">
              {paymentDescription.description}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between border-y border-[#ECEFF3] py-5">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wide text-[#9aa4b1]">
                Doação única
              </p>
              <p className="mt-2 text-[9px] leading-tight text-[#b3bac2]">
                Os dados serão enviados ao a Cielo conforme o método escolhido.
              </p>
            </div>

            <strong className="text-[20px] font-extrabold text-black">
              R$ {formattedValue}
            </strong>
          </div>

          {error && (
            <div className="mt-6 rounded-lg border border-[#F2B8B5] bg-[#FFF4F2] px-4 py-3 text-center text-[12px] font-medium text-[#A40201]">
              {error}
            </div>
          )}

          <button
            onClick={handleContinuar}
            disabled={isSubmitting}
            className={`mt-8 flex h-12.5 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-bold uppercase tracking-wide text-white transition-all ${
              !isSubmitting
                ? "bg-[#216587] hover:bg-[#1a4f6b]"
                : "bg-[#216587]/45"
            }`}
          >
            {isSubmitting ? "Conectando à Cielo..." : "Ir para pagamento"}
            {!isSubmitting && <span className="text-lg leading-none">→</span>}
          </button>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            <FiLock size={11} className="text-[#BFC5CC]" />
            <p className="text-center text-[10px] text-[#BFC5CC]">
              Pagamento processado pela Cielo em ambiente seguro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Aguardando a confirmação da Cielo sobre mensagens, prazos e campos de cada
// método para substituir estas descrições provisórias por regras definitivas.
function getPaymentDescription(metodo: MetodoPagamento) {
  if (metodo === "pix") {
    return {
      title: "Pix pela Cielo",
      description:
        "O QR Code e o código copia e cola serão gerados pela Cielo nesta página.",
    };
  }

  if (metodo === "boleto") {
    return {
      title: "Boleto pela Cielo",
      description:
        "O boleto será disponibilizado após a confirmação dos campos exigidos pela Cielo.",
    };
  }

  return {
    title: "Cartão pela Cielo",
    description:
      "A coleta segura e a tokenização do cartão aguardam a confirmação do fluxo Cielo.",
  };
}
