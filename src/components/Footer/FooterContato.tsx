import { FiAtSign, FiMapPin, FiPhone } from 'react-icons/fi';

type FooterContatoProps = {
  address: string[];
  email: string;
  phone: string;
};

export default function FooterContato({ address, email, phone }: FooterContatoProps) {
  return (
    <section>
      <h3 className="font-semibold tracking-[0.18em]">
        Contato
      </h3>

      <ul className="flex flex-col gap-3 mt-4">
        <a href={`mailto:${email}`} className="flex items-center gap-3 transition hover:text-white">
          <FiAtSign className="shrink-0 " size={20} />
          <span>{email}</span>
        </a>

        <a
          href={`tel:${phone.replace(/[^\d+]/g, '')}`}
          className="flex items-center gap-3 transition hover:text-white"
        >
          <FiPhone className="shrink-0 " size={20} />
          <span>{phone}</span>
        </a>

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <FiMapPin className="mt-0.5 shrink-0 " size={20} />
            <p className="leading-6">
              {address.map((line, index) => (
                <span key={line} className={index === 0 ? 'block' : 'block'}>
                  {line}
                </span>
              ))}
            </p>
          </div>

        </div>
      </ul>

      
    </section>
  );
}
