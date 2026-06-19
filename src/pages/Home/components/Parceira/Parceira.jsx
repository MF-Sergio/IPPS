import BlocoLayout from "../../../../layout/BlocoLayout.jsx";
import ImagemPublic from "../../../../components/ImagemPublic/ImagemPublic.jsx";
import { Botao } from "../../../../components/Botao/botao.jsx";

export function Parceira() {
  return (
    <BlocoLayout>
      <div className="flex justify-between items-center gap-8 mt-6 w-full">
        <div className="w-1/2">
          /<ImagemPublic nomeImagem="seja_parceira.png"></ImagemPublic>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="p-6 bg-red-100 rounded-lg mb-4 flex items-center justify-center w-16 h-16"></div>
          <h1 className="text-2xl font-bold mb-8 text-center ">
            Seja uma ONG Parceira
          </h1>
          <p className="mb-4 text-center">
            Conecte sua causa a uma rede de desenvolvimento social. Cadastre sua
            organização e faça parte dessa rede de impacto social.
          </p>
          <Botao
            className="flex items-center justify-center gap-3 py-2 px-5 bg-[#216587] text-white rounded-lg transition-colors duration-200 cursor-pointer"
            texto="Quero ser parceira"
          ></Botao>
        </div>
      </div>
    </BlocoLayout>
  );
}

export default Parceira;
