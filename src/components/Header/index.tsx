import { useState } from 'react';
import { Botao } from '../Botao/Botao.jsx';
import Logo from '../Logo/Logo';
import HeaderMobileToggle from './HeaderMobileToggle';
import HeaderNav from './HeaderNav';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

const navLinks = ['Quem somos', 'O que fazemos', 'Impacto', 'Seja Parceiro', 'Transparência'];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="container mt-10 mx-auto w-full text-black flex items-center justify-between my-6 font-semibold relative z-50">
      <Logo variant="nova" />

      <HeaderMobileToggle
        isOpen={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={`absolute md:static top-16 left-0 right-0 md:flex gap-42 bg-white md:bg-transparent z-50 md:z-auto ${isOpen ? 'flex flex-col' : 'hidden md:flex'}`}
        >
        <HeaderNav navLinks={navLinks} />
        <Link to="/?doar=1" className="flex items-center justify-center gap-3 py-2 px-5 bg-[#216587] hover:bg-[#1b5570] text-white rounded-lg transition-colors duration-200 cursor-pointer no-underline">
          <FiHeart /> Doar agora
        </Link>
      </div>
    </header>
  );
}
