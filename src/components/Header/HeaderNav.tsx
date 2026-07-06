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
    <nav className="flex items-center gap-6">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className="text-lg whitespace-nowrap text-center transition-colors hover:text-[var(--titulo)]"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}
