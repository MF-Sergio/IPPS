import { useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiHeart,
  FiShield,
} from "react-icons/fi";
import qrCode from "../../../../assets/img/qrcode_ipps.jpg";
import type { DoacaoData } from "../../index";

interface StepPixProps {
  dados: DoacaoData;
  onVoltar: () => void;
}

const pixCode =
  "00020126580014br.gov.bcb.pix0136ippromocaodasaude@gmail.com5204000053039865802BR";

const instructions = [
  {
    num: "01",
    title: "COPIE O CÓDIGO OU ESCANEIE",
    desc: "Use a câmera ou o botão acima para capturar os dados.",
  },
  {
    num: "02",
    title: "CONFIRME OS DADOS",
    desc: 'Verifique se o destinatário é "Editorial Philanthropy".',
  },
  {
    num: "03",
    title: "PRONTO!",
    desc: "Seu impacto começará assim que o pagamento for processado.",
  },
];

export default function StepPix({ dados }: StepPixProps) {
  const [copied, setCopied] = useState(false);
  const formattedValue = dados.valor.toFixed(2).replace(".", ",");

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="flex w-full justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-160 rounded-[18px] border border-[#E7E8EB] bg-white px-5 py-6 shadow-[0_18px_48px_rgba(0,0,0,0.03)] sm:px-6 sm:py-7">
        <div className="flex items-start justify-between rounded-2xl bg-white px-2 pb-7 shadow-[0_18px_40px_rgba(0,0,0,0.05)]">
          <div>
            <p className="font-serif text-[13px] uppercase tracking-wide text-[#4d4045]">
              Resumo da doação
            </p>
            <p className="mt-2 text-[18px] font-extrabold text-[#A40201]">
              R$ {formattedValue}
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A9C6D0] text-[#216587]">
            <FiHeart fill="#216587" size={18} />
          </span>
        </div>

        <div className="mt-10 text-center">
          <h2 className="font-serif text-[28px] font-bold uppercase leading-tight text-[#1C1D1D]">
            Finalize com Pix
          </h2>
          <p className="mx-auto mt-2 max-w-75 text-[12px] leading-relaxed text-[#6f6368]">
            Abra o app do seu banco e escolha a opção PIX para realizar o
            pagamento.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <span className="rounded-full bg-[#5A100F] px-4 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
            QR Code Dinâmico
          </span>
        </div>

        <div className="mt-5 flex justify-center">
          <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_42px_rgba(0,0,0,0.08)]">
            <div className="rounded bg-[#242020] p-5 shadow-[7px_7px_0_rgba(0,0,0,0.25)]">
              <img
                src={qrCode}
                alt="QR Code PIX"
                className="h-35.5 w-35.5 object-contain"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`mt-8 flex h-11.5 w-full items-center justify-center gap-2 rounded-lg text-[12px] font-bold uppercase tracking-wide text-white transition-colors ${
            copied ? "bg-green-600" : "bg-[#216587] hover:bg-[#1a4f6b]"
          }`}
        >
          {copied ? <FiCheckCircle size={16} /> : <FiCopy size={16} />}
          {copied ? "Código copiado" : "Copiar código PIX"}
        </button>

        <div className="mt-4 flex items-center gap-3 rounded-full bg-[#F1F0EF] px-5 py-3">
          <FiClock className="shrink-0 text-[#216587]" size={16} />
          <p className="text-[11px] leading-relaxed text-[#6f7680]">
            O código expira em <strong>30 minutos</strong>. Após o pagamento, a
            confirmação é imediata.
          </p>
        </div>

        <div className="mt-14 space-y-7">
          {instructions.map(({ num, title, desc }) => (
            <div key={num} className="grid grid-cols-[34px_1fr] gap-5">
              <span className="font-serif text-[20px] font-bold italic text-[#D77777]">
                {num}
              </span>
              <div>
                <p className="font-serif text-[14px] font-bold uppercase leading-tight text-[#1C1D1D] text-left">
                  {title}
                </p>
                <p className="mt-1 max-w-62.5 text-[10px] leading-relaxed text-[#566070] text-left">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex items-center justify-center gap-1.5 text-[#BFC5CC]">
          <FiShield size={12} />
          <p className="text-[10px]">Ambiente protegido para sua doação.</p>
        </div>
      </div>
    </section>
  );
}
