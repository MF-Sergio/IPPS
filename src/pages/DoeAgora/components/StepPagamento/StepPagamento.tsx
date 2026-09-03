import { FiLock } from "react-icons/fi";
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

export default function StepPagamento({
  dados,
  onChange,
  onSubmit,
  isSubmitting,
  error,
  currentStep,
}: StepPagamentoProps) {
  const metodo: MetodoPagamento = dados.metodoPagamento;

  const handleContinuar = () => {
    onChange({ metodoPagamento: metodo });
    onSubmit(metodo);
  };

  const cartaoValido =
    metodo === "cartao" &&
    dados.cartao.numero.replace(/\D/g, "").length >= 13 &&
    dados.cartao.titular.trim().length >= 3 &&
    /^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(dados.cartao.validade) &&
    dados.cartao.cvv.replace(/\D/g, "").length >= 3 &&
    !!dados.cartao.bandeira;

  const handleNumeroCartao = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 19);
    const parts: string[] = [];

    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.slice(i, i + 4));
    }

    onChange({
      cartao: {
        ...dados.cartao,
        numero: parts.join(" "),
      },
    });
  };

  const handleValidadeCartao = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    const formatted =
      digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;

    onChange({
      cartao: {
        ...dados.cartao,
        validade: formatted,
      },
    });
  };

  const handleCvvCartao = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    onChange({
      cartao: {
        ...dados.cartao,
        cvv: digits,
      },
    });
  };

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
          <div className="mt-7 rounded-xl border border-[#ECEFF3] bg-[#F8F8F8] px-6 py-5 text-center">
            <p className="text-[12px] font-bold uppercase tracking-wide text-[#1d2a38]">
              {paymentDescription.title}
            </p>
            <p className="mt-2 text-[12px] leading-relaxed text-[#566070]">
              {paymentDescription.description}
            </p>
          </div>

          {metodo === "cartao" && (
            <div className="mt-7 rounded-xl border border-[#ECEFF3] bg-[#FAF8F8] p-5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                Dados do cartão
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Bandeira
                  </label>
                  <select
                    value={dados.cartao.bandeira}
                    onChange={(event) =>
                      onChange({
                        cartao: {
                          ...dados.cartao,
                          bandeira: event.target.value,
                        },
                      })
                    }
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors focus:ring-2 focus:ring-[#a9171a]/30"
                  >
                    <option value="Visa">Visa</option>
                    <option value="Master">Mastercard</option>
                    <option value="Amex">Amex</option>
                    <option value="Elo">Elo</option>
                    <option value="Hipercard">Hipercard</option>
                    <option value="Diners">Diners</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Número do cartão
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={dados.cartao.numero}
                    onChange={(event) => handleNumeroCartao(event.target.value)}
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Nome do titular
                  </label>
                  <input
                    type="text"
                    placeholder="Nome impresso no cartão"
                    value={dados.cartao.titular}
                    onChange={(event) =>
                      onChange({
                        cartao: {
                          ...dados.cartao,
                          titular: event.target.value,
                        },
                      })
                    }
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                      Validade
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/AAAA"
                      value={dados.cartao.validade}
                      onChange={(event) =>
                        handleValidadeCartao(event.target.value)
                      }
                      className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                      CVV
                    </label>
                    <input
                      type="password"
                      inputMode="numeric"
                      placeholder="123"
                      value={dados.cartao.cvv}
                      onChange={(event) => handleCvvCartao(event.target.value)}
                      className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

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
            disabled={isSubmitting || (metodo === "cartao" && !cartaoValido)}
            className={`mt-8 flex h-12.5 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-bold uppercase tracking-wide text-white transition-all ${
              !isSubmitting && !(metodo === "cartao" && !cartaoValido)
                ? "bg-[#216587] hover:bg-[#1a4f6b]"
                : "bg-[#216587]/45"
            }`}
          >
            {isSubmitting
              ? "Conectando à Cielo..."
              : metodo === "cartao"
                ? "Finalizar pagamento"
                : "Ir para pagamento"}
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
