import { useState } from 'react';
import logo from '../../assets/img/novaLogo.png';
import { FiHeart, FiX, FiMenu } from "react-icons/fi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ['Quem somos', 'Impacto', 'Projetos', 'Abrangência', 'Seja Parceiro', 'Transparência', 'Eventos'];

  return (
    <header className="container mx-auto w-full text-black flex items-center justify-between my-6 font-semibold">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-16" />
      </div>

      <button className='flex items-center justify-center gap-2 px-[14.5px] py-[10px] bg-[#216587] text-white rounded-lg w-[136px] h-[44px] md:w-auto leading-[100%]'>
        <FiHeart size={24} /> Doar agora
      </button>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div
        className={`absolute md:static top-16 left-0 right-0 md:flex gap-9 bg-white md:bg-transparent 
        ${isOpen ? 'flex flex-col' : 'hidden md:flex'}`}
      >
        <nav className="flex md:flex-row flex-col gap-6 p-4 md:p-0">
          {navLinks.map((link) => (
            <button key={link} className="text-left md:text-center text-sm md:text-xl">
              {link}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
