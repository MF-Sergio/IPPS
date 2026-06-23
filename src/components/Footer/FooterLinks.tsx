type FooterLinksProps = {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export default function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/95">
        {title}
      </h3>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-10">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-sm text-white/80 transition hover:text-white hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
