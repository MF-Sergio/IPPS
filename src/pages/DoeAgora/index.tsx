import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import StepValor from "./components/StepValor/StepValor";
import StepDados from "./components/StepDados/StepDados";
import StepPagamento from "./components/StepPagamento/StepPagamento";
import StepConfirmacao from "./components/StepConfirmacao/StepConfirmacao";
import StepPix from "./components/StepPix/StepPix";

export interface DoacaoData {
  valor: number;
  nome: string;
  email: string;
  cpf: string;
  metodoPagamento: "pix" | "cartao" | "boleto";
  cartao?: {
    numero: string;
    vencimento: string;
    cvv: string;
    nome: string;
  };
}

const getInitialMetodo = (
  metodo: string | null,
): DoacaoData["metodoPagamento"] => {
  if (metodo === "boleto" || metodo === "cartao" || metodo === "pix") {
    return metodo;
  }

  return "pix";
};

export default function DoeAgora() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [dados, setDados] = useState<DoacaoData>({
    valor: 0,
    nome: "",
    email: "",
    cpf: "",
    metodoPagamento: getInitialMetodo(searchParams.get("metodo")),
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const updateDados = (partial: Partial<DoacaoData>) => {
    setDados((prev) => ({ ...prev, ...partial }));
  };

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
      {step === 3 && (
        <StepPagamento
          dados={dados}
          onChange={updateDados}
          onNext={() => {
            if (dados.metodoPagamento === "pix") {
              setStep(5);
            } else {
              nextStep();
            }
          }}
          onBack={prevStep}
          currentStep={3}
        />
      )}
      {step === 4 && (
        <StepConfirmacao dados={dados} onVoltar={() => setStep(1)} />
      )}
      {step === 5 && (
        <StepPix dados={dados} onVoltar={() => setStep(1)} />
      )}
    </div>
  );
}
