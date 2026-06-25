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
      <h3 className="font-semibold tracking-[0.18em]">
        {title}
      </h3>

      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-10">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="transition hover:text-white hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
