import type { IconType } from "react-icons";

interface DonationOptionCardProps {
  icon?: IconType;
  iconSrc?: string;
  title: string;
  description?: string;
  onClick: () => void;
  className?: string;
}

export default function DonationOptionCard({
  icon: Icon,
  iconSrc,
  title,
  description,
  onClick,
  className = "",
}: DonationOptionCardProps) {
  return (
    <article
      className={`flex min-h-59.5 w-full max-w-72.5 flex-col items-center justify-center rounded-lg border border-[#7B7B7C] bg-white px-7 py-8 text-center shadow-[0_4px_4px_rgba(0,0,0,0.25)] ${className}`}
    >
      {iconSrc ? (
        <img
          src={iconSrc}
          alt=""
          aria-hidden="true"
          className="mb-7 h-7.5 w-7.5 object-contain"
        />
      ) : (
        Icon && (
          <Icon className="mb-7 text-[#d71920]" size={30} strokeWidth={2.4} />
        )
      )}

      <h3 className="text-[13px] font-semibold leading-tight text-black">
        {title}
      </h3>

      {description && (
        <p className="mt-4 min-h-11.25 max-w-47.5 text-[10px] font-normal leading-tight text-black">
          {description}
        </p>
      )}

      <button
        type="button"
        onClick={onClick}
        className={`${description ? "mt-5" : "mt-8"} h-10.5 w-42 cursor-pointer rounded-lg bg-[#216587] text-[10px] font-semibold text-white transition-colors hover:bg-[#1a4f6b]`}
      >
        Doar
      </button>
    </article>
  );
}
