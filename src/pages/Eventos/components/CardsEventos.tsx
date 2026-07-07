import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { ReservaEventosCard } from "./ReservaEventosCard";

const events: Array<{
  title: string;
  description: string;
  date: string;
  location: string;
  time: string;
  image: string;
  imagePosition: "left" | "right";
}> = [];

export function CardsEventos() {
  const hasEvents = events.length > 0;

  return (
    <section className="mx-auto w-full max-w-[1180px] px-8 pb-20">
      {hasEvents ? (
        events.map((event) => {
          const isImageRight = event.imagePosition === "right";

          return (
            <article
              className={`mb-10 overflow-hidden rounded-[1.75rem] border border-[#f4dfe3] bg-[#fdf4f5] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.04)] ${isImageRight ? "grid grid-cols-[1fr_1.25fr]" : "grid grid-cols-[1.25fr_1fr]"}`}
              key={event.title}
            >
              <div
                className={`relative min-h-[320px] overflow-hidden rounded-[1.35rem] ${isImageRight ? "order-2" : ""}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${event.image})` }}
                />
                <div className="absolute inset-0 rounded-[1.35rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.35)]" />

                <div className="absolute inset-x-5 bottom-5 rounded-[1rem] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[rgba(28,29,29,0.72)] shadow-sm backdrop-blur">
                  {event.title}
                </div>
              </div>

              <div
                className={`flex flex-col justify-between gap-5 px-5 py-4 ${isImageRight ? "order-1" : ""}`}
              >
                <div>
                  <h2 className="text-[1.5rem] font-black leading-tight text-[#232323]">
                    {event.title}
                  </h2>

                  <p className="mt-3 text-base leading-7 text-[rgba(28,29,29,0.72)]">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--vermelho)] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                        <FaCalendarAlt className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#232323]">
                          Data:
                        </p>
                        <p className="text-sm text-[rgba(28,29,29,0.7)]">
                          {event.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--verde)] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                        <FaMapMarkerAlt className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#232323]">
                          Local:
                        </p>
                        <p className="text-sm leading-6 text-[rgba(28,29,29,0.7)]">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--icones)] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                        <FaClock className="text-sm" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#232323]">
                          Horário:
                        </p>
                        <p className="text-sm text-[rgba(28,29,29,0.7)]">
                          {event.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="inline-flex w-full max-w-[360px] items-center justify-center gap-3 rounded-md bg-[#2a6f92] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_20px_rgba(42,111,146,0.2)] transition duration-300 hover:bg-[#245f7c]">
                  Fazer inscrição
                </button>
              </div>
            </article>
          );
        })
      ) : (
        <ReservaEventosCard />
      )}
    </section>
  );
}
