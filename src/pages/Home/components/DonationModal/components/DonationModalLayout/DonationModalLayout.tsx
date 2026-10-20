import { useEffect, useId, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { FiArrowLeft } from "react-icons/fi";
import logo from "../../../../../../assets/img/logo.webp";

interface DonationModalLayoutProps {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  onBack: () => void;
  contentClassName?: string;
  headerClassName?: string;
  imageGapClassName?: string;
  imageClassName?: string;
}

export default function DonationModalLayout({
  title,
  description,
  children,
  onBack,
  contentClassName = "",
  headerClassName = "",
  imageGapClassName = "mt-16 sm:mt-[124px]",
  imageClassName = "h-[260px] sm:h-[488px]",
}: DonationModalLayoutProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLElement>(null);

  // foco entra no diálogo ao abrir e volta para quem o abriu ao fechar
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  // Esc fecha; Tab fica preso dentro do diálogo
  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onBack();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    const active = document.activeElement;

    if (event.shiftKey && (active === first || active === dialogRef.current)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <section
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="donation-modal-shell outline-none fixed inset-0 z-100 h-dvh w-full overflow-y-auto overflow-x-hidden bg-[#FAEEF1] text-black">
      <button
        type="button"
        onClick={onBack}
        className="absolute left-6 top-7 z-20 flex cursor-pointer items-center gap-2 text-[13px] font-normal text-black transition-opacity hover:opacity-70 sm:left-[9%] sm:top-14.5"
      >
        <FiArrowLeft size={16} strokeWidth={2} />
        <span>Voltar</span>
      </button>

      <div
        className={`donation-modal-content relative z-10 mx-auto flex w-full max-w-245 flex-col items-center px-5 pt-14.5 sm:pt-19 ${contentClassName}`}
      >
        <img
          src={logo}
          width={174}
          height={184}
          alt="Instituto de Pesquisa e Promocao da Saude"
          className="h-18.5 w-18.5 object-contain"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(16%) sepia(80%) saturate(3164%) hue-rotate(348deg) brightness(88%) contrast(94%)",
          }}
        />

        <header className={`mt-12 text-center sm:mt-13.5 ${headerClassName}`}>
          <h1 id={titleId} className="text-[25px] font-bold leading-tight text-[#1C1D1D] sm:text-[26px]">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-195 text-[12px] font-medium leading-[1.45] text-black sm:text-[13px]">
              {description}
            </p>
          )}
        </header>

        {children}
      </div>

      <div
        className={`pointer-events-none relative z-0 w-full shrink-0 overflow-hidden ${imageClassName} ${imageGapClassName}`}
      >
        <img
          src="/img/doacao-maos-solidarias.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-[#FAEEF1]/35" />
        <svg
          className="absolute -top-px left-0 z-10 h-38 w-full sm:h-48"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="#FAEEF1"
            d="M0 0H1440V18C1328 48 1240 92 1145 124C1098 140 1058 134 1016 110C927 58 829 9 746 3C691 -1 642 35 586 68C493 123 402 154 315 125C213 91 111 45 0 18Z"
          />
        </svg>
      </div>
    </section>
  );
}
