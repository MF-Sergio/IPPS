import { useState } from "react";
import qrCode from "../../../../../../assets/img/qrcode_ipps.jpg";
import DonationModalLayout from "../DonationModalLayout/DonationModalLayout";

interface DonationPixReceiptModalProps {
  valor: number;
  onBack: () => void;
}

const pixCode =
  "00020101021226770014BR.GOV.BCB.PIX2553api.pix/q/v2/5fc66387-a5f1-42b0-89a5-be00851bf2815204000053039865802BR5925ABRACE UMA CAUSA GESTAO E DOA6009SAO PAULO62070502***6304B548";

export default function DonationPixReceiptModal({
  valor,
  onBack,
}: DonationPixReceiptModalProps) {
  const [copied, setCopied] = useState(false);

  const formattedValue = valor.toFixed(2).replace(".", ",");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <DonationModalLayout
      title="Recebemos o seu pedido de doação"
      onBack={onBack}
      headerClassName="mt-10 sm:mt-[42px]"
      imageGapClassName="mt-10 sm:mt-12"
    >
      <div className="mt-4 flex w-full flex-col items-center text-center">
        <p className="text-[13px] font-bold leading-tight text-black">
          Pedido <span className="text-[#216587]">nº 189115</span> foi recebido
          com sucesso.
        </p>

        <p className="mt-8 text-[16px] font-bold leading-tight text-black">
          Agora é só pagar com o código Pix abaixo:
        </p>

        <p className="mt-8 text-[16px] font-bold leading-tight text-black">
          Valor total de:{" "}
          <span className="text-[#216587]">R$ {formattedValue}</span>
        </p>

        <img
          src={qrCode}
          alt="QR Code PIX"
          className="mt-4 h-[170px] w-[170px] object-contain sm:h-[190px] sm:w-[190px]"
        />

        <p className="mt-5 max-w-[540px] break-words text-[12px] font-bold leading-[1.15] text-black">
          {pixCode}
        </p>

        <button
          type="button"
          onClick={handleCopy}
          className="mt-5 h-[38px] w-[250px] cursor-pointer rounded-[4px] bg-[#216587] text-[12px] font-semibold text-white transition-colors hover:bg-[#1a4f6b]"
        >
          {copied ? "Código PIX copiado" : "Copiar código PIX"}
        </button>
      </div>
    </DonationModalLayout>
  );
}
