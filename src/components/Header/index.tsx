import { useState } from "react";
import Logo from "../Logo/Logo";
import HeaderMobileToggle from "./HeaderMobileToggle";
import HeaderNav from "./HeaderNav";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const navLinks = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Impacto", href: "/#impacto" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Abrangência", href: "/#abrangencia" },
  { label: "Seja Parceiro", href: "/seja-parceiro" },
  { label: "Transparência", href: "/#transparencia" },
  { label: "Eventos", href: "/eventos" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mt-9 mx-auto flex w-full max-w-[1150px] px-4 sm:px-6 lg:px-8 text-black items-center justify-between my-6 font-semibold relative z-50">
      <Logo variant="nova" />

      <HeaderMobileToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <div
        className={`absolute md:static top-16 left-0 right-0 md:flex md:items-center gap-9 bg-white md:bg-transparent z-50 md:z-auto ${isOpen ? "flex flex-col" : "hidden md:flex"}`}
      >
        <HeaderNav navLinks={navLinks} onNavigate={() => setIsOpen(false)} />
        <Link
          to="/?doar=1"
          onClick={() => setIsOpen(false)}
          className="flex h-[48px] w-[201px] cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#216587] px-5 py-2 text-lg text-white no-underline transition-colors duration-200 hover:bg-[#1b5570]"
        >
          <FiHeart /> Doar agora
        </Link>
      </div>
    </header>
  );
}
