import logo from '../../assets/img/logo.png';
import { FiHeart } from "react-icons/fi";

export default function Header() {
  const navLinks = ['Quem somos', 'Impacto', 'Projetos', 'Abrangência', 'Seja Parceiro', 'Transparência', 'Eventos']

  return (
    <header className="container mx-auto w-full text-black flex items-center justify-between my-6">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16" />
        </div>

        <div className='flex gap-9'>
            <nav className="flex gap-6">
                {navLinks.map((link) => (
                    <button
                        key={link}
                        className="transition-colors duration-200 cursor-pointer font-semibold text-xl"
                    >
                        {link}
                    </button>
                ))}
            </nav>

            <button className='flex items-center justify-center gap-3 py-2 px-5 bg-[#216587] text-white rounded-lg transition-colors duration-200 cursor-pointer'>
                <FiHeart /> Doar agora
            </button>
        </div>
      
    </header>
  )
}
