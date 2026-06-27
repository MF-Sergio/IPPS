import { useState } from "react";
import { FiLock, FiHeart } from "react-icons/fi";

interface StepValorProps {
  valor: number;
  onSelect: (valor: number) => void;
  onNext: () => void;
}

const valoresPreDefinidos = [25, 50, 100, 250, 500, 1000];
const heroMarkerGradient =
  "linear-gradient(180deg, #A40201 0%, #9E1C17 7%, #982A25 14%, #923330 21%, #8B3B39 29%, #844242 36%, #7D474A 43%, #764C52 50%, #6E515A 57%, #655562 64%, #5C5969 71%)";
const heroImageFade =
  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.2) 50%, #FEF8F8 100%)";

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
      <div className="relative mb-0 w-full sm:mb-30">

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

        <div className="relative hidden sm:block">
          <div className="relative h-155 w-full overflow-hidden bg-gray-300">
            <img
              src="/img/Atividade de psicomotricidade_ basquete de cama elástica. 1.jpg"
              alt="Crianças jogando basquete"
              className="h-full w-full object-fill object-center"
            />

            <div
              className="absolute inset-x-0 bottom-0 h-[48%]"
              style={{ background: heroImageFade }}
            />
          </div>

          <div className="absolute inset-x-0 bottom-20 px-4">
            <div className="mx-auto max-w-190">
              <div className="w-full rounded-lg bg-white px-9 py-5 shadow-[0_4px_16px_rgba(0,0,0,0.18)]">
                <div className="flex items-start gap-4">
                  <div
                    className="mt-0.5 h-12 w-0.75 shrink-0 rounded-full"
                    style={{ background: heroMarkerGradient }}
                  />
                  <div>
                    <h1 className="font-serif text-[30px] font-bold uppercase leading-none text-[#A40201]">
                      QUERO DOAR
                    </h1>
                    <p className="mt-5 text-[14px] leading-6 text-[#3a3436]">
                      Sua contribuição transforma vidas.
                      <br />
                      Selecione uma das opções abaixo ou defina um valor personalizado.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile hero card (shown below collage, hidden on sm+) */}
        <div className="sm:hidden bg-white px-5 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-1 h-9 rounded-full shrink-0"
              style={{ background: heroMarkerGradient }}
            />
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
      <div className="mx-auto w-full max-w-190 rounded-xl border border-[#E8E3E5] bg-white px-4 pt-6 pb-10 shadow-[0_8px_28px_rgba(0,0,0,0.035)] sm:px-12 sm:py-12">
        <div className="w-full mx-auto flex items-center justify-center">
          <div className="max-w-140 w-full p-6 sm:p-0">

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
