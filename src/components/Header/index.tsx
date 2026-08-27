import { useState } from "react";
import Logo from "../Logo/Logo";
import HeaderNav from "./HeaderNav";
import HeaderMobileToggle from "./HeaderMobileToggle";
import { Botao } from "../Botao/Botao";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

const desktopNavLinks = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Impacto", href: "/#impacto" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Abrangência", href: "/#abrangencia" },
  { label: "Seja Parceiro", href: "/seja-parceiro" },
  { label: "Transparência", href: "/transparencia" },
  { label: "Eventos", href: "/eventos" },
];

const mobileNavLinks = [
  { label: "Quem somos", href: "/quem-somos" },
  {
    label: "O que oferecemos",
    items: [
      { label: "Projetos", href: "/#projetos" },
      { label: "Abrangência", href: "/#abrangencia" },
      { label: "Eventos", href: "/eventos" },
    ],
  },
  { label: "Impacto", href: "/#impacto" },
  { label: "Seja Parceiro", href: "/seja-parceiro" },
  { label: "Transparência", href: "/transparencia" },
];

const donateButtonProps = {
  texto: "Doar agora",
  href: "/pages/doeagora.html",
  icone: faHeart,
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 mx-auto mt-4 w-[calc(100%-32px)] max-w-[1150px] bg-transparent px-4 py-5 font-semibold text-black shadow-none sm:mt-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 md:flex md:justify-between md:gap-9">
        <Logo variant="nova" imageClassName="h-11 w-auto sm:h-19" />

        {/* Botão: mobile e tablet */}
        <div className="justify-self-center md:hidden">
          <Botao
            {...donateButtonProps}
            className="h-[35px] w-[136px] text-sm hover:bg-[#1b5570] sm:text-lg"
          />
        </div>

        <HeaderMobileToggle
          isOpen={isOpen}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        />

        {/* Botão: desktop */}
        <div className="hidden md:flex md:items-center md:gap-9">
          <HeaderNav navLinks={desktopNavLinks} />
          <Link
            to="/?doar=1"
            className="flex items-center justify-center gap-3 py-2 px-5 bg-[#216587] hover:bg-[#1b5570] text-white rounded-lg transition-colors duration-200 cursor-pointer no-underline"
          >
            <FiHeart /> Doar agora
          </Link>
        </div>
      </div>

      {isOpen ? (
        <div className="absolute left-1/2 top-full z-50 mt-4 w-screen -translate-x-1/2 bg-[var(--fundo)] px-15 pt-19 pb-44 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-[40px] top-[23px] flex h-[15px] w-[15px] items-end justify-center text-black"
            aria-label="Fechar menu"
          >
            <FiX size={15} />
          </button>

          <HeaderNav
            navLinks={mobileNavLinks}
            onNavigate={() => setIsOpen(false)}
            className="flex flex-col items-start gap-5"
          />
        </div>
      ) : null}
    </header>
  );
}
