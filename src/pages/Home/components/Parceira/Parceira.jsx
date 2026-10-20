import BlocoLayout from "../../../../layout/BlocoLayout.jsx";
import ImagemPublic from "../../../../components/ImagemPublic/ImagemPublic.jsx";
import { Botao } from "../../../../components/Botao/Botao.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import imgSejaParceira from "../../../../assets/img/seja_parceira.webp";

export function Parceira() {
  return (
    <BlocoLayout id="seja-parceira">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mt-6 w-full">
        <div className="w-full">
          <ImagemPublic
            src={imgSejaParceira}
            alt="Representantes de ONGs parceiras do IPPS"
            width={1200}
            height={900}
          />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="p-6 bg-red-100 rounded-lg mb-4 flex items-center justify-center w-16 h-16 text-[var(--vermelho)]">
            <FontAwesomeIcon icon={faHandshake} />
          </div>
          <h2 className="text-2xl font-bold mb-8 text-center ">
            Seja uma ONG Parceira
          </h2>
          <p className="mb-4 text-center">
            Conecte sua causa a uma rede de desenvolvimento social. Cadastre sua
            organização e faça parte dessa rede de impacto social.
          </p>
          <Botao
            texto="Quero Ser Parceira"
            pagina="/seja-parceiro"
            className="hover:bg-[#1b5570]"
            icone={faHandshake}
          />
        </div>
      </div>
    </BlocoLayout>
  );
}

export default Parceira;
