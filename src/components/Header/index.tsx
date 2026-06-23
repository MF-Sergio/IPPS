import { useState } from 'react';
import { Botao } from '../Botao/Botao.jsx';
import Logo from '../Logo/Logo';
import HeaderMobileToggle from './HeaderMobileToggle';
import HeaderNav from './HeaderNav';
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const navLinks = ['Quem somos', 'O que fazemos', 'Impacto', 'Seja Parceiro', 'Transparência'];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="container mt-10 mx-auto w-full text-black flex items-center justify-between my-6 font-semibold relative z-50">
      <Logo/>

      <HeaderMobileToggle
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={`absolute md:static top-16 left-0 right-0 md:flex gap-[168px] bg-white md:bg-transparent z-50 md:z-auto ${isOpen ? 'flex flex-col' : 'hidden md:flex'}`}
        >
        <HeaderNav navLinks={navLinks} />
        <Botao 
          texto="Doar agora"
          icone={faHeart}
          className="w-[201px] h-[48px] hover:bg-[#1b5570]"
        />
      </div>
    </header>
  );
}
