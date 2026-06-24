import type { IconType } from "react-icons";

interface DonationOptionCardProps {
  icon: IconType;
  title: string;
  description?: string;
  onClick: () => void;
  className?: string;
}

export default function DonationOptionCard({
  icon: Icon,
  title,
  description,
  onClick,
  className = "",
}: DonationOptionCardProps) {
  return (
    <article
      className={`flex min-h-[238px] w-full max-w-[290px] flex-col items-center justify-center rounded-[3px] border border-[#9d9d9d]/70 bg-white px-7 py-8 text-center shadow-[4px_6px_5px_rgba(0,0,0,0.2)] ${className}`}
    >
      <Icon className="mb-7 text-[#d71920]" size={30} strokeWidth={2.4} />

      <h3 className="text-[13px] font-semibold leading-tight text-black">
        {title}
      </h3>

      {description && (
        <p className="mt-4 min-h-[45px] max-w-[190px] text-[10px] font-normal leading-tight text-black">
          {description}
        </p>
      )}

      <button
        type="button"
        onClick={onClick}
        className={`${description ? "mt-5" : "mt-8"} h-[42px] w-[168px] cursor-pointer rounded-[4px] bg-[#216587] text-[10px] font-semibold text-white transition-colors hover:bg-[#1a4f6b]`}
      >
        Doar
      </button>
    </article>
  );
}
