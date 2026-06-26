import BlocoLayout from "../../../../layout/BlocoLayout";
import { Botao } from "../../../../components/Botao/Botao.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export function Doacao() {
  return (
    <BlocoLayout>
      <div className="bg-[#EAAEC6]/60 text-black py-12 px-6 rounded-lg text-center shadow-lg flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">
          Sua doação transforma vidas!
        </h2>
        <p className="text-lg mb-6 w-3/4 mx-auto">
          Com sua contribuição, podemos continuar promovendo inclusão, cidadania
          e autonomia para milhares de pessoas com deficiência e suas famílias.
        </p>
        <Botao
          texto="Doar Agora"
          className="hover:bg-[#1b5570]"
          icone={faHeart}
        />
      </div>
    </BlocoLayout>
  );
}

export default Doacao;
