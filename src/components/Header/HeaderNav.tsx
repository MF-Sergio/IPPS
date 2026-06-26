type HeaderNavLink = {
  label: string;
  href: string;
};

type HeaderNavProps = {
  navLinks: HeaderNavLink[];
  onNavigate?: () => void;
};

export default function HeaderNav({ navLinks, onNavigate }: HeaderNavProps) {
  return (
    <nav className="flex md:flex-row flex-col md:flex-nowrap gap-6 p-4 md:p-0 items-start md:items-center">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className="text-left md:text-center text-lg whitespace-nowrap transition-colors hover:text-[var(--titulo)]"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}