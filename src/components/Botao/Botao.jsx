import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Botao({ texto, pagina, icone, mensagemAlert, className = "" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!pagina) {
      alert(mensagemAlert);
    } else {
      navigate(pagina);
    }
  };

  return (
    <button
      className={`
        flex items-center justify-center gap-3
        py-2 px-5
        bg-[#216587] text-white
        rounded-lg
        transition-colors duration-200
        cursor-pointer
        ${className}
      `}
      onClick={handleClick}
    >
      {icone && <FontAwesomeIcon icon={icone} />}
      {texto}
    </button>
  );
}
