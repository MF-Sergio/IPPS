import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export function ReservaEventosCard() {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-[#f4dfe3] bg-[#fdf4f5] p-6 shadow-[0_10px_28px_rgba(0,0,0,0.04)]">
      <div className="grid grid-cols-[0.95fr_1.05fr] items-stretch gap-5">
        <div className="relative min-h-[320px] overflow-hidden rounded-[1.35rem] bg-[linear-gradient(135deg,#f6d9df_0%,#fdebed_35%,#ffffff_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(169,23,26,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(33,101,135,0.12),transparent_34%)]" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="max-w-[240px] rounded-[1.5rem] bg-white/80 p-6 text-center shadow-[0_14px_36px_rgba(0,0,0,0.08)] backdrop-blur">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--vermelho)] text-white shadow-[0_8px_18px_rgba(164,2,1,0.18)]">
                <FaCalendarAlt className="text-2xl" />
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--vermelho)]">
                Eventos em pausa
              </p>
              <h3 className="mt-2 text-2xl font-black leading-tight text-[#232323]">
                Sem eventos no momento
              </h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-5 px-5 py-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[var(--vermelho)] shadow-sm">
              Aviso importante
            </div>

            <h2 className="mt-4 text-[1.5rem] font-black leading-tight text-[#232323]">
              Não estamos realizando eventos neste momento
            </h2>

            <p className="mt-3 text-base leading-7 text-[rgba(28,29,29,0.72)]">
              Nossos próximos encontros ainda estão em organização. Assim que
              novas datas forem confirmadas, esta área será atualizada com todas
              as informações de inscrição, local e horário.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--vermelho)] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                  <FaCalendarAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#232323]">Status:</p>
                  <p className="text-sm text-[rgba(28,29,29,0.7)]">
                    Sem programação ativa
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--verde)] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#232323]">
                    Como acompanhar:
                  </p>
                  <p className="text-sm leading-6 text-[rgba(28,29,29,0.7)]">
                    Fique de olho no site e nas redes do IPPS para as novas
                    datas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--icones)] shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
                  <FaClock className="text-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#232323]">
                    Atualização:
                  </p>
                  <p className="text-sm text-[rgba(28,29,29,0.7)]">
                    Em breve teremos novidades.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#2a6f92] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_20px_rgba(42,111,146,0.2)] sm:mx-auto sm:max-w-[360px]">
            Acompanhe as novidades
          </button>
        </div>
      </div>
    </article>
  );
}
