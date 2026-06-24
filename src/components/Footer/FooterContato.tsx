import { FiAtSign, FiMapPin, FiPhone } from 'react-icons/fi';

type FooterContatoProps = {
  address: string[];
  email: string;
  phone: string;
  cnpj: string;
};

export default function FooterContato({ address, email, phone, cnpj }: FooterContatoProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/95">
        Contato
      </h3>

      <div className="mt-6 space-y-5 text-sm text-white/85">
        <div className="flex items-start gap-3">
          <FiMapPin className="mt-0.5 shrink-0 text-white" size={20} />
          <p className="leading-6">
            {address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <a href={`mailto:${email}`} className="flex items-center gap-3 transition hover:text-white">
          <FiAtSign className="shrink-0 text-white" size={20} />
          <span>{email}</span>
        </a>

        <a
          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
          className="flex items-center gap-3 transition hover:text-white"
        >
          <FiPhone className="shrink-0 text-white" size={20} />
          <span>{phone}</span>
        </a>

        <p className="leading-6 text-white/75">
          CNPJ: {cnpj}
        </p>
      </div>
    </section>
  );
}
