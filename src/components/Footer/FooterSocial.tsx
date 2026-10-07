import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const socialLinks = [
  { label: 'Instagram', href: '#', icon: FaInstagram },
  { label: 'WhatsApp', href: '#', icon: FaWhatsapp },
];

export default function FooterSocial() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => {
        const Icon = social.icon;

        return (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/14 text-white transition hover:bg-white/24 hover:scale-[1.03]"
          >
            <Icon size={22} />
          </a>
        );
      })}
    </div>
  );
}
