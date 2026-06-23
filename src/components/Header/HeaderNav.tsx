import { useState } from 'react';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

type HeaderNavProps = {
  navLinks: string[];
};

const dropdownLinks = ['Projetos', 'Abrangência', 'Eventos'];

export default function HeaderNav({ navLinks }: HeaderNavProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="flex md:flex-row flex-col md:flex-nowrap gap-4 md:gap-[60px] p-4 md:p-0 items-start md:items-center">
      {navLinks.map((link) => {
        if (link === 'O que fazemos') {
          return (
            <div key={link} className="relative flex flex-col items-start md:items-start">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((currentValue) => !currentValue)}
                className="uppercase flex items-center justify-start gap-2 text-base whitespace-nowrap"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {link}
                {isDropdownOpen ? (
                  <FaCaretUp className="text-black" size={14} />
                ) : (
                  <FaCaretDown className="text-black" size={14} />
                )}
              </button>

              <div
                className={`rounded-md mt-3 overflow-hidden bg-[var(--fundo)] p-3 shadow-none transition-all duration-200 ease-out md:absolute md:left-0 md:top-full md:mt-3 md:origin-top md:z-50 ${isDropdownOpen ? 'max-h-40 opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'max-h-0 opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
              >
                <div className="flex flex-col gap-2">
                  {dropdownLinks.map((dropdownLink) => (
                    <button
                      key={dropdownLink}
                      type="button"
                      className="uppercase text-center text-base whitespace-nowrap block"
                    >
                      {dropdownLink}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <button key={link} type="button" className="uppercase text-left md:text-center text-base whitespace-nowrap">
            {link}
          </button>
        );
      })}
    </nav>
  );
}