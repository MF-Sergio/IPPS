import {
  introducaoTransparencia,
  tituloTransparencia,
} from "./transparenciaDados";

export default function CabecalhoTransparencia() {
  return (
    <section className="w-full pb-8 sm:pt-2">
      <div className="sm:mt-15 w-full text-center">
        <h1 className="text-4xl font-bold text-[var(--vermelho)]">
          {tituloTransparencia}
        </h1>
      </div>

      <div className="rounded-2xl sm:border border-[#e5bfd0] sm:bg-[#f2cfde] px-12 py-14 text-center sm:shadow-[0_2px_6px_rgba(0,0,0,0.18)]">
        <h2 className="text-[22px] font-bold text-[#1C1D1D]">
          {introducaoTransparencia.title}
        </h2>
        <p className="mx-auto mt-6 text-center text-[18px] font-medium leading-relaxed text-[#333]">
          {introducaoTransparencia.description}
        </p>
      </div>
    </section>
  );
}
