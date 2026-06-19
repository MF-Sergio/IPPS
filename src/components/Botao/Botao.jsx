import styles from "../../styles/botao.module.css";
import { useNavigate } from "react-router-dom";

export function Botao(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.pagina === undefined) {
      alert(props.mensagemAlert);
    } else {
      navigate(props.pagina);
    }
  };

  return (
    <button
      className={{ ...styles.button, ...props.style }}
      onClick={handleClick}
    >
      {props.texto}
    </button>
  );
}
