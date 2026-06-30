import ImagemPublic from "../ImagemPublic/ImagemPublic";
import { ArrowRight } from "react-bootstrap-icons";

export function CardComImagem(props) {
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
    </div>
  );
}

export default CardComImagem;
