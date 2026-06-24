import { useState } from "react";
import { FiLock, FiHeart } from "react-icons/fi";

interface StepValorProps {
  valor: number;
  onSelect: (valor: number) => void;
  onNext: () => void;
}

const valoresPreDefinidos = [25, 50, 100, 250, 500, 1000];

export default function StepValor({ valor, onSelect, onNext }: StepValorProps) {
  const [customValor, setCustomValor] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(valor || null);

  const handlePresetSelect = (v: number) => {
    setSelectedPreset(v);
    setCustomValor("");
    onSelect(v);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setCustomValor(raw);
    setSelectedPreset(null);
    if (raw) {
      onSelect(Number(raw));
    } else {
      onSelect(0);
    }
  };

  const canProceed = valor > 0;

  return (
    <div className="flex w-full flex-col">

      {/* ── HERO ── */}
      {/* Mobile: 3-photo collage; Desktop: 100vw × 700px, card overlay aligned to container */}
      <div className="relative w-full mb-0 sm:mb-16">

        {/* Mobile collage (hidden on sm+) */}
        <div className="flex flex-col gap-0.5 sm:hidden">
          <div className="w-full h-48 bg-gray-300 overflow-hidden">
            <img
              src="/img/Atividade de psicomotricidade_ basquete de cama elástica. 1.jpg"
              alt="Crianças jogando basquete"
              className="w-full h-full object-cover object-top"
            />
          </div>
          {/* Duas fotos menores — recortando partes diferentes da mesma imagem */}
          <div className="grid grid-cols-2 gap-0.5">
            <div className="h-32 bg-gray-300 overflow-hidden">
              <img
                src="/img/Atividade de psicomotricidade_ basquete de cama elástica. 1.jpg"
                alt="Crianças jogando basquete"
                className="w-full h-full object-cover object-left"
              />
            </div>
            <div className="h-32 bg-gray-400 overflow-hidden">
              <img
                src="/img/Atividade de psicomotricidade_ basquete de cama elástica. 1.jpg"
                alt="Crianças jogando basquete"
                className="w-full h-full object-cover object-right"
              />
            </div>
          </div>
        </div>

        {/* Desktop hero — full viewport width, 700px tall (hidden on mobile) */}
        <div className="hidden sm:block w-full h-175 bg-gray-300 overflow-hidden relative">
          <img
            src="/img/Atividade de psicomotricidade_ basquete de cama elástica. 1.jpg"
            alt="Crianças jogando basquete"
            className="w-full h-full object-cover object-top"
          />

          {/* Dark gradient at bottom so card is readable */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white/60 to-transparent" />

          {/* Card — pinned to bottom, aligned to the same container as the content below */}
          <div className="absolute bottom-10 left-0 right-0">
            <div className="max-w-5xl mx-auto">
              <div className="inline-block bg-white rounded-2xl shadow-xl px-10 py-8 w-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1 h-10 bg-[#a9171a] rounded-full shrink-0" />
                  <h1 className="text-3xl font-extrabold text-[#A40201] tracking-tight leading-tight">
                    QUERO DOAR
                  </h1>
                </div>
                <p className="text-sm text-justify ml-5 text-[#1C1D1D] leading-relaxed">
                  Sua contribuição transforma vidas.<br />
                  Selecione uma das opções abaixo ou defina um valor personalizado.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hero card (shown below collage, hidden on sm+) */}
        <div className="sm:hidden bg-white px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-9 bg-[#a9171a] rounded-full shrink-0" />
            <h1 className="text-2xl font-extrabold text-[#a9171a] tracking-tight leading-tight">
              QUERO DOAR
            </h1>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Sua contribuição transforma vidas.<br />
            Selecione uma das opções abaixo ou defina um valor personalizado.
          </p>
        </div>
      </div>

      {/* ── VALUE SELECTION ── */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-12 lg:py-12 bg-white/10 sm:bg-white pt-6 pb-10 rounded-3xl border-2 border-inset border-white/20 backdrop-blur-md">
        <div className="w-full mx-auto flex items-center justify-center">
          <div className="max-w-3xl w-full p-6">

          {/* Section title */}
          <div className="mb-14">
            <h2 className="text-3xl sm:text-2xl font-bold text-[#1C1D1D] mb-1 leading-tight">
              ESCOLHA O VALOR PARA<br className="sm:hidden" />
              {" "}CONTRIBUIR
            </h2>
            <p className="text-xs text-gray-400 italic mb-6">Transforme vidas hoje.</p>
          </div>

          {/* Preset values — 2 cols mobile, 3 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {valoresPreDefinidos.map((v) => (
              <button
                key={v}
                onClick={() => handlePresetSelect(v)}
                className={`py-4 px-4 rounded-xl border-2 text-center font-bold text-base transition-all ${
                  selectedPreset === v
                    ? "border-[#a9171a] bg-[#a9171a]/5 text-[#a9171a]"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }`}
              >
                R$ {v}
              </button>
            ))}
          </div>

          {/* Custom value */}
          <div className="mb-11">
            <label className="flex text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">
              Ou digite outro valor:
            </label>
            <input
              type="text"
              placeholder="Digite o valor"
              value={customValor ? `R$ ${customValor}` : ""}
              onChange={handleCustomChange}
              className="w-full py-4 px-4 bg-[#F6F8F9] border-none rounded-xl text-base text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-[#a9171a] transition-colors"
            />
          </div>

          {/* Disclaimer — mobile only */}
          <p className="sm:hidden text-[11px] text-gray-400 mb-6 mt-3 leading-relaxed">
            Toda doação, independentemente do valor, contribui para nossa missão.
          </p>

          {/* CTA Button */}
          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`w-full sm:w-80 sm:mx-auto sm:flex sm:justify-center flex items-center justify-center gap-2 py-4 sm:px-16 rounded-xl font-bold text-white text-base tracking-wide transition-all ${
              canProceed
                ? "bg-[#216587] hover:bg-[#1a4f6b] cursor-pointer"
                : "bg-[#216587]/50 cursor-not-allowed"
            }`}
          >
            CONTINUAR
            <span className="text-lg">→</span>
          </button>

          {/* Security badges — mobile only */}
          <div className="sm:hidden flex items-center justify-center gap-6 mt-5">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
              <FiLock size={13} className="text-gray-400" />
              AMBIENTE SEGURO
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
              <FiHeart size={13} className="text-gray-400" />
              DOAÇÃO ABERTA
            </div>
          </div>
          </div>{/* /max-w-lg */}
        </div>{/* /max-w-screen-xl */}
      </div>{/* /value section */}
    </div>
  );
}
