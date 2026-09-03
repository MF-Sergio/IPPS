import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DonationPaymentMethodModal from "./components/DonationPaymentMethodModal/DonationPaymentMethodModal";
import DonationStartModal from "./components/DonationStartModal/DonationStartModal";
import type { PaymentMethod } from "./types";

type DonationModalStep = "tipoDoacao" | "formaPagamento";

export default function DonationModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<DonationModalStep>("tipoDoacao");
  const isOpen = searchParams.get("doar") === "1";

  useEffect(() => {
    if (isOpen) {
      setStep("tipoDoacao");
      document.body.style.overflow = "hidden";
      return;
    }

    document.body.style.overflow = "";
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  const closeModal = () => {
    navigate("/", { replace: true });
  };

  const handlePaymentSelect = (method: PaymentMethod) => {
    navigate(`/doe-agora?metodo=${method}`);
  };

  if (step === "formaPagamento") {
    return (
      <DonationPaymentMethodModal
        onBack={() => setStep("tipoDoacao")}
        onSelect={handlePaymentSelect}
      />
    );
  }

  return (
    <DonationStartModal
      onBack={closeModal}
      onSelect={() => setStep("formaPagamento")}
    />
  );
}
