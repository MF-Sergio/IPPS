type FooterLinksProps = {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

export default function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <section className="w-full max-w-[320px] sm:max-w-none">
      <h3 className="text-center text-[16px] font-semibold tracking-[0.16em] sm:text-start">
        {title}
      </h3>

      <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 text-[15px] sm:gap-x-10 sm:gap-y-3 sm:text-sm sm:justify-items-start">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="block transition hover:text-white hover:underline underline-offset-4"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
