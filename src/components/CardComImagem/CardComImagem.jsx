import ImagemPublic from "../ImagemPublic/ImagemPublic";
import { ArrowRight } from "react-bootstrap-icons";

export function CaixaComImagem(props) {
  return (
    <div className="flex flex-col bg-white-100 rounded-lg border-1 border-[var(--borda)]-300 items-center justify-center w-96 content-center">
      <div className="flex items-center justify-center">
        <ImagemPublic nomeImagem={props.imagemUrl} />
      </div>
      <br />
      <h2 className="text-xl font-bold mb-4 text-[var(--titulo)]">
        {props.titulo}
      </h2>
      <p className="p-6 text-justify">{props.descricao}</p>
      <div className="flex items-center justify-end w-full px-6 py-3">
        <button className="w-full text-right p-3 text-[var(--titulo)] text-xl font-bold">
          Saiba mais
        </button>
        <ArrowRight className="text-[var(--titulo)] text-3xl font-bold" />
      </div>
    </div>
  );
}

export default CaixaComImagem;
