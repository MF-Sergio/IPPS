import DonationModalLayout from "../DonationModalLayout/DonationModalLayout";
import DonationOptionCard from "../DonationOptionCard/DonationOptionCard";
import type { PaymentMethod } from "../../types";

const iconPath = "/img/donation-icons";

interface DonationPaymentMethodModalProps {
  onBack: () => void;
  onSelect: (method: PaymentMethod) => void;
}

const paymentOptions = [
  {
    key: "boleto" as const,
    title: "Boleto",
    iconSrc: `${iconPath}/boleto-icon.svg`,
  },
  {
    key: "pix" as const,
    title: "PIX",
    iconSrc: `${iconPath}/pix-icon.svg`,
  },
  {
    key: "money" as const,
    title: "Cartão de crédito",
    iconSrc: `${iconPath}/money-icon.svg`,
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
      <div className="mt-12 grid w-full max-w-208.75 grid-cols-1 justify-items-center gap-6 sm:mt-10.5 sm:grid-cols-3">
        {paymentOptions.map((option) => (
          <DonationOptionCard
            key={option.key}
            icon={option.icon}
            iconSrc={option.iconSrc}
            title={option.title}
            onClick={() => onSelect(option.key)}
            className="min-h-71.5"
          />
        ))}
      </div>
    </DonationModalLayout>
  );
}
