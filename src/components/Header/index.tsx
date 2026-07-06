import Logo from "../Logo/Logo";
import HeaderNav from "./HeaderNav";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";

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
  return (
    <header className="relative z-50 mx-auto mt-10 flex w-full max-w-[1150px] items-center justify-between font-semibold text-black">
      <Logo variant="nova" />

      <div className="flex items-center gap-9">
        <HeaderNav navLinks={navLinks} />
        <Link
          to="/?doar=1"
          className="flex h-[48px] w-[201px] cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#216587] px-5 py-2 text-lg text-white no-underline transition-colors duration-200 hover:bg-[#1b5570]"
        >
          <FiHeart /> Doar agora
        </Link>
      </div>
    </header>
  );
}
