import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type BotaoProps = {
  texto: string;
  pagina?: string;
  href?: string;
  icone?: IconDefinition;
  mensagemAlert?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export function Botao({
  texto,
  pagina,
  href,
  icone,
  mensagemAlert,
  className = '',
  type = 'button',
}: BotaoProps) {
  const navigate = useNavigate();

  const content = (
    <>
      {icone && <FontAwesomeIcon icon={icone} />}
      {texto}
    </>
  );

  const baseClasses = `flex items-center justify-center gap-3 py-2 px-5 bg-[#216587] text-white rounded-lg transition-colors duration-200 cursor-pointer ${className}`;

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