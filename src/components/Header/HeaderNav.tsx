import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type HeaderNavLink = {
  label: string;
  href: string;
};

type HeaderNavDropdown = {
  label: string;
  items: HeaderNavLink[];
};

type HeaderNavItem = HeaderNavLink | HeaderNavDropdown;

type HeaderNavProps = {
  navLinks: HeaderNavItem[];
  onNavigate?: () => void;
  className?: string;
};

export default function HeaderNav({
  navLinks,
  onNavigate,
  className = "",
}: HeaderNavProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className={className || "flex items-center gap-6"}>
      {navLinks.map((link) => {
        if ("items" in link) {
          return (
            <div
              key={link.label}
              className="relative flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() =>
                  setIsDropdownOpen((currentValue) => !currentValue)
                }
                className="flex items-center gap-1 text-lg whitespace-nowrap text-center transition-colors hover:text-[var(--titulo)]"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {link.label}
                {isDropdownOpen ? (
                  <FiChevronUp size={16} />
                ) : (
                  <FiChevronDown size={16} />
                )}
              </button>

              {isDropdownOpen ? (
                <div className="mt-3 flex flex-col gap-3 md:absolute md:left-0 md:top-full md:z-50 md:mt-3 md:w-max md:rounded-md md:bg-[var(--fundo)] md:px-4 md:py-4 md:shadow-lg">
                  {link.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        onNavigate?.();
                      }}
                      className="text-lg whitespace-nowrap text-center transition-colors hover:text-[var(--titulo)]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <a
            key={link.label}
            href={link.href}
            onClick={onNavigate}
            className="text-lg whitespace-nowrap text-center transition-colors hover:text-[var(--titulo)]"
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
