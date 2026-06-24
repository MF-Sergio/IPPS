import { BsQrCode } from "react-icons/bs";
import { FiCreditCard, FiFileText } from "react-icons/fi";
import DonationModalLayout from "../DonationModalLayout/DonationModalLayout";
import DonationOptionCard from "../DonationOptionCard/DonationOptionCard";
import type { PaymentMethod } from "../../types";

interface DonationPaymentMethodModalProps {
  onBack: () => void;
  onSelect: (method: PaymentMethod) => void;
}

const paymentOptions = [
  {
    key: "boleto" as const,
    title: "Boleto",
    icon: FiFileText,
  },
  {
    key: "pix" as const,
    title: "PIX",
    icon: BsQrCode,
  },
  {
    key: "cartao" as const,
    title: "Cartão de crédito",
    icon: FiCreditCard,
  },
];

export default function DonationPaymentMethodModal({
  onBack,
  onSelect,
}: DonationPaymentMethodModalProps) {
  return (
    <DonationModalLayout
      title="Transforme solidariedade em impacto real"
      description="Sua doação fortalece projetos que promovem desenvolvimento social e mudam vidas de forma concreta. Escolha como você deseja contribuir e gere impacto de forma direta."
      onBack={onBack}
    >
      <div className="mt-12 grid w-full max-w-[835px] grid-cols-1 justify-items-center gap-6 sm:mt-[42px] sm:grid-cols-3">
        {paymentOptions.map((option) => (
          <DonationOptionCard
            key={option.key}
            icon={option.icon}
            title={option.title}
            onClick={() => onSelect(option.key)}
            className="min-h-[286px]"
          />
        ))}
      </div>
    </DonationModalLayout>
  );
}
