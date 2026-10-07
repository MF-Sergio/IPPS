import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import DonationModalLayout from "../DonationModalLayout/DonationModalLayout";
import type { DonationKind } from "../DonationStartModal/DonationStartModal";

interface DonationContactModalProps {
  kind: Exclude<DonationKind, "dinheiro">;
  onBack: () => void;
}

const contactContent = {
  produtos: {
    title: "Doe produtos e transforme vidas",
    description:
      "Entre em contato para saber quais itens são mais necessários e combinar a entrega da sua doação.",
  },
  servicos: {
    title: "Doe seus serviços e compartilhe seu talento",
    description:
      "Fale com nossa equipe para apresentar sua proposta e descobrir como sua experiência pode apoiar o IPPS.",
  },
} as const;

export default function DonationContactModal({
  kind,
  onBack,
}: DonationContactModalProps) {
  const content = contactContent[kind];

  return (
    <DonationModalLayout
      title={content.title}
      description={content.description}
      onBack={onBack}
      imageGapClassName="mt-14 sm:mt-[92px]"
    >
      <div className="mt-10 w-full max-w-145 rounded-[20px] border border-[#E7E1E3] bg-white p-6 text-left shadow-[0_18px_48px_rgba(0,0,0,0.05)] sm:mt-12 sm:p-8">
        <div className="border-b border-[#ECE7E7] pb-5">
          <p className="font-serif text-[13px] font-bold uppercase tracking-wide text-[#4d4045]">
            Fale com o IPPS
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-[#6f6368]">
            Nossa equipe ajudará você a organizar a melhor forma de contribuir.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <div className="flex items-start gap-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3E7D9] text-[#A40201]">
              <FiMapPin size={17} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#4d4045]">
                Endereço
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#1C1D1D]">
                Avenida de Santa Cruz, 1631, Realengo
                <br />
                Rio de Janeiro - RJ, CEP 21710-255
              </p>
            </div>
          </div>

          <a
            href="tel:+5521985856380"
            className="flex items-start gap-4 transition-opacity hover:opacity-70"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D8E7EC] text-[#216587]">
              <FiPhone size={17} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#4d4045]">
                Telefone e WhatsApp
              </p>
              <p className="mt-1 text-[13px] text-[#1C1D1D]">(21) 98585-6380</p>
            </div>
          </a>

          <a
            href="mailto:ippromocaodasaude@gmail.com"
            className="flex items-start gap-4 transition-opacity hover:opacity-70"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3E7D9] text-[#A40201]">
              <FiMail size={17} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#4d4045]">
                E-mail
              </p>
              <p className="mt-1 break-all text-[13px] text-[#1C1D1D]">
                ippromocaodasaude@gmail.com
              </p>
            </div>
          </a>
        </div>
      </div>
    </DonationModalLayout>
  );
}
