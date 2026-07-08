import { useState } from "react";
import Logo from "../Logo/Logo";
import HeaderNav from "./HeaderNav";
import HeaderMobileToggle from "./HeaderMobileToggle";
import { Botao } from "../Botao/Botao";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const navLinks = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Impacto", href: "/#impacto" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Abrangência", href: "/#abrangencia" },
  { label: "Seja Parceiro", href: "/seja-parceiro" },
  { label: "Transparência", href: "/transparencia" },
  { label: "Eventos", href: "/eventos" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative z-50 mx-auto mt-4 w-[calc(100%-32px)] max-w-[1150px] bg-transparent px-4 py-5 font-semibold text-black shadow-none sm:mt-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 md:flex md:justify-between md:gap-9">
        <Logo variant="nova" imageClassName="h-12 w-auto sm:h-14" />

        <div className="justify-self-center md:hidden">
          <Botao
            texto="Doar agora"
            href="/pages/doeagora.html"
            className="h-[48px] w-[201px] text-base hover:bg-[#1b5570] sm:text-lg"
            icone={faHeart}
          />
        </div>

        <HeaderMobileToggle
          isOpen={isOpen}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        />

        <div className="hidden md:flex md:items-center md:gap-9">
          <HeaderNav navLinks={navLinks} />
          <Botao
            texto="Doar agora"
            href="/pages/doeagora.html"
            className="h-[48px] w-[201px] text-lg hover:bg-[#1b5570]"
            icone={faHeart}
          />
        </div>
      </div>

      {isOpen ? (
        <div className="mt-4 pt-4 md:hidden">
          <HeaderNav
            navLinks={navLinks}
            onNavigate={() => setIsOpen(false)}
            className="flex flex-col items-start gap-4"
          />
        </div>
      ) : null}
    </header>
  );
}
