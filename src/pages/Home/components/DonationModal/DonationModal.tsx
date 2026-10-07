import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DonationPaymentMethodModal from "./components/DonationPaymentMethodModal/DonationPaymentMethodModal";
import DonationContactModal from "./components/DonationContactModal/DonationContactModal";
import DonationStartModal from "./components/DonationStartModal/DonationStartModal";
import type { DonationKind } from "./components/DonationStartModal/DonationStartModal";
import type { PaymentMethod } from "./types";

type DonationModalStep = "tipoDoacao" | "formaPagamento" | "contato";

export default function DonationModal() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<DonationModalStep>("tipoDoacao");
  const [contactKind, setContactKind] =
    useState<Exclude<DonationKind, "dinheiro">>("produtos");
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

  const handleDonationSelect = (kind: DonationKind) => {
    if (kind === "dinheiro") {
      setStep("formaPagamento");
      return;
    }

    setContactKind(kind);
    setStep("contato");
  };

  if (step === "formaPagamento") {
    return (
      <DonationPaymentMethodModal
        onBack={() => setStep("tipoDoacao")}
        onSelect={handlePaymentSelect}
      />
    );
  }

  if (step === "contato") {
    return (
      <DonationContactModal
        kind={contactKind}
        onBack={() => setStep("tipoDoacao")}
      />
    );
  }

  return (
    <DonationStartModal onBack={closeModal} onSelect={handleDonationSelect} />
  );
}
