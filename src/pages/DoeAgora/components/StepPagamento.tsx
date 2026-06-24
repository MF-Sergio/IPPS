import { useState } from "react";
import { FiCreditCard, FiFileText, FiLock } from "react-icons/fi";
import type { DoacaoData } from "../index";
import StepIndicator from "./StepIndicator";

interface StepPagamentoProps {
  dados: DoacaoData;
  onChange: (partial: Partial<DoacaoData>) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
}

type MetodoPagamento = "pix" | "cartao" | "boleto";

const iconPath = "/img/donation-icons";

export default function StepPagamento({
  dados,
  onChange,
  onNext,
  currentStep,
}: StepPagamentoProps) {
  const [metodo, setMetodo] = useState<MetodoPagamento>(dados.metodoPagamento);
  const [cartaoNumero, setCartaoNumero] = useState("");
  const [cartaoVencimento, setCartaoVencimento] = useState("");
  const [cartaoCvv, setCartaoCvv] = useState("");
  const [cartaoNome, setCartaoNome] = useState("");

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
    (metodo === "cartao" &&
      cartaoNumero &&
      cartaoVencimento &&
      cartaoCvv &&
      cartaoNome);

  const formattedValue = dados.valor.toFixed(2).replace(".", ",");

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

          {metodo === "cartao" && (
            <div className="mt-7 max-w-77.5 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4d4045]">
                  Número do cartão
                </label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    value={cartaoNumero}
                    onChange={(event) =>
                      setCartaoNumero(formatCardNumber(event.target.value))
                    }
                    className="h-8.5 w-full rounded-md border-0 bg-[#F5F3F3] px-4 pr-10 text-[11px] text-gray-800 outline-none placeholder:text-[#c7c0c3] focus:bg-white focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                  <FiCreditCard
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c6c0c4]"
                    size={15}
                  />
                </div>
              </div>

              <div className="grid grid-cols-[130px_95px] gap-5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Vencimento
                  </label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={cartaoVencimento}
                    onChange={(event) =>
                      setCartaoVencimento(formatVencimento(event.target.value))
                    }
                    className="mt-2 h-8.5 w-full rounded-md border-0 bg-[#F5F3F3] px-4 text-[11px] text-gray-800 outline-none placeholder:text-[#c7c0c3] focus:bg-white focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4d4045]">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cartaoCvv}
                    onChange={(event) =>
                      setCartaoCvv(
                        event.target.value.replace(/\D/g, "").slice(0, 4),
                      )
                    }
                    className="mt-2 h-8.5 w-full rounded-md border-0 bg-[#F5F3F3] px-4 text-[11px] text-gray-800 outline-none placeholder:text-[#c7c0c3] focus:bg-white focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#4d4045]">
                  Nome impresso no cartão
                </label>
                <input
                  type="text"
                  placeholder="NOME COMO NO CARTÃO"
                  value={cartaoNome}
                  onChange={(event) =>
                    setCartaoNome(event.target.value.toUpperCase())
                  }
                  className="mt-2 h-9.5 w-full rounded-md border-0 bg-[#F5F3F3] px-4 text-[11px] text-gray-800 outline-none placeholder:text-[#c7c0c3] focus:bg-white focus:ring-2 focus:ring-[#a9171a]/30"
                />
              </div>
            </div>
          )}

          {metodo === "pix" && (
            <div className="mt-7 rounded-xl border border-[#ECEFF3] bg-[#F8F8F8] px-6 py-5 text-center">
              <p className="text-[12px] leading-relaxed text-[#566070]">
                Ao continuar, você receberá um{" "}
                <strong className="text-[#1d2a38]">QR Code</strong> e{" "}
                <strong className="text-[#1d2a38]">código copia e cola</strong>{" "}
                para finalizar o pagamento.
              </p>
            </div>
          )}

          {metodo === "boleto" && (
            <div className="mt-7 rounded-xl border border-[#ECEFF3] bg-[#F8F8F8] px-6 py-5 text-center">
              <p className="text-[12px] leading-relaxed text-[#566070]">
                Um boleto será gerado com vencimento em{" "}
                <strong className="text-[#1d2a38]">3 dias úteis</strong>.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-y border-[#ECEFF3] py-5">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-wide text-[#9aa4b1]">
                Doação única
              </p>
              {metodo === "cartao" && (
                <p className="mt-2 text-[9px] leading-tight text-[#b3bac2]">
                  Uma taxa de processamento de R$ 3,50 pode ser aplicada.
                </p>
              )}
            </div>

            <strong className="text-[20px] font-extrabold text-black">
              R$ {formattedValue}
            </strong>
          </div>

          <button
            onClick={handleContinuar}
            disabled={!canProceed}
            className={`mt-8 flex h-12.5 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-bold uppercase tracking-wide text-white transition-all ${
              canProceed
                ? "bg-[#216587] hover:bg-[#1a4f6b]"
                : "bg-[#216587]/45"
            }`}
          >
            Continuar
            <span className="text-lg leading-none">→</span>
          </button>

          <div className="mt-5 flex items-center justify-center gap-1.5">
            <FiLock size={11} className="text-[#BFC5CC]" />
            <p className="text-center text-[10px] text-[#BFC5CC]">
              Pagamento seguro com criptografia SSL.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
