import DonationModalLayout from "../DonationModalLayout/DonationModalLayout";
import DonationOptionCard from "../DonationOptionCard/DonationOptionCard";

export type DonationKind = "produtos" | "servicos" | "dinheiro";

const iconPath = "/img/donation-icons";

interface DonationStartModalProps {
  onBack: () => void;
  onSelect: (kind: DonationKind) => void;
}

const donationOptions = [
  {
    key: "produtos" as const,
    title: "Doação de Produtos",
    description:
      "Contribua com itens que apoiam diretamente nossos projetos e beneficiários.",
    iconSrc: `${iconPath}/product-icon.svg`,
  },
  {
    key: "servicos" as const,
    title: "Doação de Serviços",
    description:
      "Ofereça sua expertise e ajude a fortalecer nossas iniciativas sociais.",
    iconSrc: `${iconPath}/service-icon.svg`,
  },
  {
    key: "dinheiro" as const,
    title: "Doação em Dinheiro",
    description:
      "Faça uma contribuição financeira e amplie o alcance das nossas ações.",
    iconSrc: `${iconPath}/money-icon.svg`,
  },
];

export default function DonationStartModal({
  onBack,
  onSelect,
}: DonationStartModalProps) {
  return (
    <DonationModalLayout
      title="Transforme solidariedade em impacto real"
      description="Sua doação fortalece projetos que promovem desenvolvimento social e mudam vidas de forma concreta. Escolha como você deseja contribuir e gere impacto de forma direta."
      onBack={onBack}
    >
      <div className="mt-12 grid w-full max-w-208.75 grid-cols-1 justify-items-center gap-6 sm:mt-13 sm:grid-cols-3">
        {donationOptions.map((option) => (
          <DonationOptionCard
            key={option.key}
            iconSrc={option.iconSrc}
            title={option.title}
            description={option.description}
            onClick={() => onSelect(option.key)}
          />
        ))}
      </div>
    </DonationModalLayout>
  );
}
