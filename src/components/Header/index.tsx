import { useState } from "react";
import { Botao } from "../Botao/Botao.tsx";
import Logo from "../Logo/Logo";
import HeaderMobileToggle from "./HeaderMobileToggle";
import HeaderNav from "./HeaderNav";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const navLinks = [
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Impacto", href: "/#impacto" },
  { label: "Projetos", href: "/#projetos" },
  { label: "Abrangência", href: "/#abrangencia" },
  { label: "Seja Parceiro", href: "/seja-parceiro" },
  { label: "Transparência", href: "/#transparencia" },
  { label: "Trabalhe Conosco", href: "/trabalhe-conosco" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mt-10 mx-auto flex w-full max-w-[1150px] px-4 sm:px-6 lg:px-8 text-black items-center justify-between my-6 font-semibold relative z-50">
      <Logo variant="nova" />

      <HeaderMobileToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <div
        className={`absolute md:static top-16 left-0 right-0 md:flex md:items-center gap-9 bg-white md:bg-transparent z-50 md:z-auto ${isOpen ? "flex flex-col" : "hidden md:flex"}`}
      >
        <HeaderNav navLinks={navLinks} onNavigate={() => setIsOpen(false)} />
        <Botao
          texto="Doar Agora"
          href="mailto:ippromocaodasaude@gmail.com?subject=Quero%20fazer%20uma%20doa%C3%A7%C3%A3o"
          className="h-[48px] w-[201px] text-lg hover:bg-[#1b5570]"
          icone={faHeart}
        />
      </div>
    </header>
  );
}
