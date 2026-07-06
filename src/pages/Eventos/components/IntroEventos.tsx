import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const infos = [
  {
    icon: <FaCalendarAlt />,
    title: "Eventos Anuais",
    description: "Programação regular durante todo o ano",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Localização",
    description: "Na sede do IPPS em Realengo",
  },
  {
    icon: <FaClock />,
    title: "Inscrição Gratuita",
    description: "Participe sem custo algum",
  },
];

export function IntroEventos() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-8 pb-14 pt-16">
      <div className="max-w-5xl">
        <div className="flex items-start gap-4">
          <span className="mt-2 h-12 w-[6px] rounded-full bg-[linear-gradient(180deg,var(--verde),var(--vermelho))]" />

          <div>
            <h1 className="text-[3.5rem] font-black uppercase leading-none tracking-[-0.03em] text-[var(--vermelho)]">
              Nossos Eventos
            </h1>

            <p className="mt-3 max-w-4xl text-lg leading-8 text-[rgba(28,29,29,0.74)]">
              Momentos de celebração, cuidado e transformação social. Participe
              dos nossos eventos e faça parte dessa história.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        {infos.map((item) => (
          <div
            className="flex items-center gap-4 rounded-2xl border border-[#f0e3e5] bg-white px-4 py-4 text-left shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(0,0,0,0.05)]"
            key={item.title}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--vermelho)] text-lg text-white shadow-[0_8px_16px_rgba(164,2,1,0.15)]">
              {item.icon}
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-bold text-[#1f1f1f]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-5 text-[rgba(28,29,29,0.68)]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
