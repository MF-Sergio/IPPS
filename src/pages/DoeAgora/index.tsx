import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import StepValor from "./components/StepValor/StepValor";
import StepDados from "./components/StepDados/StepDados";
import StepPagamento from "./components/StepPagamento/StepPagamento";
import StepPix from "./components/StepPix/StepPix";
import StepBoleto from "./components/StepBoleto/StepBoleto";
import { DonationApiError, criarDoacao } from "./services/doacaoApi";

// Aguardando a Cielo confirmar se o QR Code retornara sempre uma imagem PNG em
// Base64 ou se o provider contratado podera devolver outro MIME type.
export interface PixPagamento {
  qrCodeBase64: string;
  qrCodeString: string;
  expiraEm: string;
}

export interface BoletoPagamento {
  url: string;
  linhaDigitavel: string;
  codigoBarras: string;
  vencimento: string;
}

export interface DoacaoResposta {
  id: string;
  status: string;
  valor: number;
  metodoPagamento: "pix" | "boleto" | "cartao";
  pix?: PixPagamento;
  boleto?: BoletoPagamento;
  cartao?: {
    bandeira: string;
    ultimosDigitos: string;
  };
}

export interface EnderecoData {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

// Aguardando a confirmacao da Cielo sobre campos adicionais obrigatorios para
// o doador Pix; neste primeiro fluxo o backend exige nome, email e CPF.
export interface DoacaoData {
  valor: number;
  nome: string;
  cpf: string;
  email: string;
  metodoPagamento: "pix" | "cartao" | "boleto";
  endereco: EnderecoData;
  aceitePrivacidade: boolean;
}

const emptyEndereco: EnderecoData = {
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  cep: "",
};

const getInitialMetodo = (
  metodo: string | null,
): DoacaoData["metodoPagamento"] => {
  if (metodo === "boleto" || metodo === "cartao" || metodo === "pix") {
    return metodo;
  }

  return "pix";
};

export default function DoeAgora() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Aguardando as credenciais Cielo para validar a resposta real no sandbox;
  // enquanto isso, este estado recebe respostas simuladas ou do ambiente local.
  const [paymentResult, setPaymentResult] = useState<DoacaoResposta | null>(
    null,
  );
  const [dados, setDados] = useState<DoacaoData>({
    valor: 0,
    nome: "",
    cpf: "",
    email: "",
    metodoPagamento: getInitialMetodo(searchParams.get("metodo")),
    endereco: emptyEndereco,
    aceitePrivacidade: false,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const updateDados = (partial: Partial<DoacaoData>) => {
    setDados((prev) => ({ ...prev, ...partial }));
  };
  const donationReturn = searchParams.get("doacao");

  // Aguardando confirmar com a Cielo se a criacao Pix pode retornar pendente
  // em todos os casos ou se algum provider exige tratamento adicional.
  const iniciarCheckout = async (
    metodoPagamento: DoacaoData["metodoPagamento"],
  ) => {
    setCheckoutError(null);
    setIsSubmitting(true);

    try {
      const payment = await criarDoacao({
        ...dados,
        metodoPagamento,
      });
      setPaymentResult(payment);
      setIsSubmitting(false);
    } catch (error) {
      const message =
        error instanceof DonationApiError
          ? error.message
          : "Não foi possível iniciar o pagamento. Tente novamente.";

      setCheckoutError(message);
      setIsSubmitting(false);
    }
  };

  if (donationReturn) {
    return (
      <DonationReturnStatus
        status={donationReturn}
        onVoltar={() => {
          navigate("/doe-agora", { replace: true });
          setStep(1);
        }}
      />
    );
  }

  return (
    <div className="w-full">
      {step === 1 && (
        <StepValor
          valor={dados.valor}
          onSelect={(valor) => updateDados({ valor })}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <StepDados
          dados={dados}
          onChange={updateDados}
          onNext={nextStep}
          onBack={prevStep}
          currentStep={2}
        />
      )}
      {step === 3 && paymentResult?.metodoPagamento === "pix" ? (
        <StepPix
          dados={dados}
          payment={paymentResult}
          onVoltar={() => setPaymentResult(null)}
        />
      ) : step === 3 && paymentResult?.metodoPagamento === "boleto" ? (
        <StepBoleto
          dados={dados}
          payment={paymentResult}
          onVoltar={() => setPaymentResult(null)}
        />
      ) : step === 3 ? (
        <StepPagamento
          dados={dados}
          onChange={updateDados}
          onSubmit={iniciarCheckout}
          isSubmitting={isSubmitting}
          error={checkoutError}
          onBack={prevStep}
          currentStep={3}
        />
      ) : null}
    </div>
  );
}

interface DonationReturnStatusProps {
  status: string;
  onVoltar: () => void;
}

function DonationReturnStatus({ status, onVoltar }: DonationReturnStatusProps) {
  const content = getReturnStatusContent(status);
  const Icon = content.Icon;

  return (
    <section className="flex w-full justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-170 rounded-[20px] border border-[#E7E1E3] bg-white px-8 py-12 text-center shadow-[0_18px_48px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-[#F5F3F3] text-[#216587]">
          <Icon size={40} />
        </div>
        <h1 className="mx-auto mt-8 max-w-100 font-serif text-[24px] font-bold uppercase leading-tight text-[#1C1D1D]">
          {content.title}
        </h1>
        <p className="mx-auto mt-4 max-w-115 text-[13px] leading-relaxed text-[#6f6368]">
          {content.description}
        </p>
        <button
          type="button"
          onClick={onVoltar}
          className="mx-auto mt-8 flex h-11 w-full max-w-62.5 items-center justify-center rounded-lg bg-[#216587] text-[12px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1a4f6b]"
        >
          Fazer nova doação
        </button>
      </div>
    </section>
  );
}

function getReturnStatusContent(status: string) {
  if (status === "sucesso") {
    return {
      Icon: FiCheckCircle,
      title: "Doação iniciada com sucesso",
      description:
        "Recebemos o retorno do gateway. A confirmação final do pagamento será feita pela Cielo.",
    };
  }

  if (status === "pendente") {
    return {
      Icon: FiClock,
      title: "Pagamento pendente",
      description:
        "Seu pagamento ainda está em processamento. Em Pix ou boleto, a confirmação pode acontecer depois da finalização no banco.",
    };
  }

  return {
    Icon: FiXCircle,
    title: "Pagamento não concluído",
    description:
      "Não conseguimos concluir essa tentativa. Você pode voltar e iniciar uma nova doação com segurança.",
  };
}
