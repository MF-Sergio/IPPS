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

// Aguardando a Cielo confirmar se o CPF deve ser exibido formatado ou enviado
// somente como 11 digitos; o backend ja normaliza o valor antes da transacao.
const formatarCPF = (valor: string) => {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

// Aguardando a confirmacao do cliente sobre regras adicionais de identificacao
// exigidas pela conta Cielo, alem da validacao oficial do backend.
const validarCPF = (cpf: string) => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  // Bloqueia 000.000.000-00, 111.111.111-11 etc.
  if (/^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;

  for (let i = 0; i < 9; i++) {
    soma += Number(cpf[i]) * (10 - i);
  }

  let digito1 = (soma * 10) % 11;

  if (digito1 === 10) {
    digito1 = 0;
  }

  if (digito1 !== Number(cpf[9])) {
    return false;
  }

  soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += Number(cpf[i]) * (11 - i);
  }

  let digito2 = (soma * 10) % 11;

  if (digito2 === 10) {
    digito2 = 0;
  }

  return digito2 === Number(cpf[10]);
};

export default function StepDados({
  dados,
  onChange,
  onNext,
  currentStep,
}: StepDadosProps) {
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(dados.email.trim());
  const cpfCompleto = dados.cpf.length === 11;
  const cpfValido = cpfCompleto && validarCPF(dados.cpf);
  const cepNumerico = dados.endereco.cep.replace(/\D/g, "");
  const enderecoValido =
    dados.metodoPagamento !== "boleto" ||
    (!!dados.endereco.logradouro.trim() &&
      !!dados.endereco.numero.trim() &&
      !!dados.endereco.bairro.trim() &&
      !!dados.endereco.cidade.trim() &&
      dados.endereco.uf.trim().length === 2 &&
      cepNumerico.length === 8);

  const canProceed =
    dados.nome.trim().length >= 3 &&
    emailValido &&
    cpfValido &&
    enderecoValido &&
    dados.aceitePrivacidade;

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
              required
              type="text"
              placeholder="Como devemos chamar você?"
              value={dados.nome}
              onChange={(event) => onChange({ nome: event.target.value })}
              className="mt-2 h-12 w-full rounded-md border-0 bg-[#F5F3F3] px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:bg-white focus:ring-2 focus:ring-[#a9171a]/30"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
              CPF
            </label>

            {/* Aguardando confirmacao da Cielo sobre campos adicionais do doador. */}
            <input
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              value={formatarCPF(dados.cpf)}
              onChange={(event) => {
                const cpf = event.target.value.replace(/\D/g, "").slice(0, 11);

                onChange({ cpf });
              }}
              maxLength={14}
              className={`mt-2 h-12 w-full rounded-md border-0 bg-[#F5F3F3] px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:bg-white focus:ring-2 ${
                cpfCompleto && !cpfValido
                  ? "ring-2 ring-red-500 focus:ring-red-500"
                  : "focus:ring-[#a9171a]/30"
              }`}
            />

            {cpfCompleto && !cpfValido && (
              <p className="mt-1 text-xs text-red-500">
                CPF inválido. Verifique os números informados.
              </p>
            )}
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

          {dados.metodoPagamento === "boleto" && (
            <div className="rounded-xl border border-[#E7E1E3] bg-[#FAF8F8] p-5">
              {/* CIELO: confirmar se todos estes dados são obrigatórios para o
                  cedente, o formato do CEP/UF e os limites de cada campo. */}
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                Endereço para emissão do boleto
              </p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Logradouro
                  </label>
                  <input
                    type="text"
                    placeholder="Rua, avenida, etc."
                    value={dados.endereco.logradouro}
                    onChange={(event) =>
                      onChange({
                        endereco: {
                          ...dados.endereco,
                          logradouro: event.target.value,
                        },
                      })
                    }
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Número
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={dados.endereco.numero}
                    onChange={(event) =>
                      onChange({
                        endereco: {
                          ...dados.endereco,
                          numero: event.target.value,
                        },
                      })
                    }
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Complemento
                  </label>
                  <input
                    type="text"
                    placeholder="Opcional"
                    value={dados.endereco.complemento}
                    onChange={(event) =>
                      onChange({
                        endereco: {
                          ...dados.endereco,
                          complemento: event.target.value,
                        },
                      })
                    }
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Bairro
                  </label>
                  <input
                    type="text"
                    placeholder="Bairro"
                    value={dados.endereco.bairro}
                    onChange={(event) =>
                      onChange({
                        endereco: {
                          ...dados.endereco,
                          bairro: event.target.value,
                        },
                      })
                    }
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    Cidade
                  </label>
                  <input
                    type="text"
                    placeholder="Cidade"
                    value={dados.endereco.cidade}
                    onChange={(event) =>
                      onChange({
                        endereco: {
                          ...dados.endereco,
                          cidade: event.target.value,
                        },
                      })
                    }
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    UF
                  </label>
                  <input
                    type="text"
                    placeholder="SP"
                    value={dados.endereco.uf}
                    maxLength={2}
                    onChange={(event) =>
                      onChange({
                        endereco: {
                          ...dados.endereco,
                          uf: event.target.value.toUpperCase(),
                        },
                      })
                    }
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4d4045]">
                    CEP
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="00000-000"
                    value={dados.endereco.cep}
                    maxLength={9}
                    onChange={(event) => {
                      const cep = event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 8);
                      const formattedCep =
                        cep.length > 5
                          ? `${cep.slice(0, 5)}-${cep.slice(5)}`
                          : cep;
                      onChange({
                        endereco: { ...dados.endereco, cep: formattedCep },
                      });
                    }}
                    className="mt-2 h-12 w-full rounded-md border-0 bg-white px-5 text-sm text-gray-800 outline-none transition-colors placeholder:text-[#b6adb1] focus:ring-2 focus:ring-[#a9171a]/30"
                  />
                </div>
              </div>
            </div>
          )}

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
      </div>
    </section>
  );
}
