import BlocoLayout from "../../../../layout/BlocoLayout";
import { Botao } from "../../../../components/Botao/Botao.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
export function Newsletter() {
  return (
    <BlocoLayout>
      <div className="bg-[var(--verde)] text-[var(--branco)] py-12 px-6 rounded-lg text-center shadow-lg flex flex-col items-center justify-center">
        <div className="p-6 bg-[var(--branco)] text-[var(--verde)] rounded-full mb-4 flex items-center justify-center w-16 h-16">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <h2 className="text-3xl font-bold mb-4">
          Cadastre-se na nossa Newsletter e fique atualizado!
        </h2>
        <p className="text-lg mb-6 w-3/4 mx-auto">
          Receba nossos conteúdos exclusivos.
        </p>
        <div className="flex gap-3 w-3/4">
          <input type="text" className="bg-white text-black w-full" />
          <Botao texto="Enviar" className="hover:bg-[#1b5570]" />
        </div>
        <p className="text-lg mb-6 mt-6 w-3/4 mx-auto">
          Antes de se cadastrar, leia a <u>Política de Privacidade do IPPS</u>
        </p>
      </div>
    </BlocoLayout>
  );
}

export default Newsletter;
