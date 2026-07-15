import { FiAtSign, FiMapPin, FiPhone } from "react-icons/fi";

type FooterContatoProps = {
  address: string[];
  email: string;
  phone: string;
};

export default function FooterContato({
  address,
  email,
  phone,
}: FooterContatoProps) {
  return (
    <section className="w-full max-w-[320px] sm:max-w-none">
      <h3 className="text-center text-[16px] font-semibold tracking-[0.16em] sm:text-left">
        CONTATO
      </h3>

      <div className="mt-5 flex flex-col gap-4 text-[15px] sm:text-sm">
        <a
          href={`mailto:${email}`}
          className="flex items-start gap-3 transition hover:text-white sm:items-center"
        >
          <FiAtSign className="mt-0.5 shrink-0 sm:mt-0" size={20} />
          <span className="leading-6">{email}</span>
        </a>

        <a
          href={`tel:${phone.replace(/[^\d+]/g, "")}`}
          className="flex items-start gap-3 transition hover:text-white sm:items-center"
        >
          <FiPhone className="mt-0.5 shrink-0 sm:mt-0" size={20} />
          <span className="leading-6">{phone}</span>
        </a>

        <div className="flex items-start gap-3">
          <FiMapPin className="mt-0.5 shrink-0" size={20} />
          <p className="leading-6">
            {address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
