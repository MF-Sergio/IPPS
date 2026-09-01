import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

type BotaoProps = {
  texto: string;
  pagina?: string;
  href?: string;
  icone?: IconDefinition;
  mensagemAlert?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  iconClassName?: string;
};

export function Botao({
  texto,
  pagina,
  href,
  icone,
  mensagemAlert,
  className = "",
  type = "button",
  iconClassName = "text-[1.05rem] sm:text-[1.15rem]",
}: BotaoProps) {
  const navigate = useNavigate();

  const content = (
    <>
      {icone && <FontAwesomeIcon icon={icone} className={iconClassName} />}
      {texto}
    </>
  );

  const baseClasses = `inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#216587] px-4 py-2.5 text-white font-semibold no-underline shadow-[0_10px_20px_rgba(33,101,135,0.18)] transition-colors duration-200 hover:bg-[#1b5570] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#216587]/30 ${className}`;

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  const handleClick = () => {
    if (!pagina) {
      alert(mensagemAlert);
      return;
    }

    navigate(pagina);
  };

  return (
    <button type={type} className={baseClasses} onClick={handleClick}>
      {content}
    </button>
  );
}

export default Botao;
