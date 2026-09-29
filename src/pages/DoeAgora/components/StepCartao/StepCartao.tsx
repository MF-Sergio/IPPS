import { FiCreditCard, FiShield } from "react-icons/fi";
import type { DoacaoData, DoacaoResposta } from "../../index";

interface StepCartaoProps {
  dados: DoacaoData;
  payment: DoacaoResposta;
  onVoltar: () => void;
}

export default function StepCartao({ dados, payment }: StepCartaoProps) {
  const formattedValue = dados.valor.toFixed(2).replace(".", ",");
  const cartao = payment.cartao;

  if (!cartao) {
    return null;
  }

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
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E7D9] text-[#A40201]">
            <FiCreditCard size={18} />
          </span>
        </div>

        <div className="mt-10 text-center">
          <h2 className="font-serif text-[28px] font-bold uppercase leading-tight text-[#1C1D1D]">
            Pagamento confirmado
          </h2>
          <p className="mx-auto mt-2 max-w-90 text-[12px] leading-relaxed text-[#6f6368]">
            Sua doação foi processada com segurança pela Cielo. O cartão foi
            autorizado e o comprovante foi registrado.
          </p>
        </div>

        <div className="mt-6 rounded-[24px] border border-[#E7E1E3] bg-[#F8F8F8] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#4d4045]">
                Cartão
              </p>
              <p className="mt-2 text-[13px] font-semibold text-[#1C1D1D]">
                {cartao.bandeira} •••• {cartao.ultimosDigitos}
              </p>
            </div>
            <span className="rounded-full bg-[#E9F6EE] px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-[#11653B]">
              Autorizado
            </span>
          </div>
        </div>

        <div className="mt-9 flex items-center justify-center gap-1.5 text-[#BFC5CC]">
          <FiShield size={12} />
          <p className="text-[10px]">Ambiente protegido para sua doação.</p>
        </div>
      </div>
    </section>
  );
}
