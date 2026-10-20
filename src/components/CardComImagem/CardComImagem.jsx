import ImagemPublic from "../ImagemPublic/ImagemPublic";
import { ArrowRight } from "react-bootstrap-icons";

export function CardComImagem(props) {
  return (
    <div className="flex flex-col bg-white-100 rounded-lg border-1 border-[var(--borda)]-300 items-center justify-center max-w-96 content-center overflow-hidden ">
      <ImagemPublic
        src={props.imagem}
        srcSet={props.srcSet}
        sizes="(max-width: 640px) 100vw, 384px"
        alt={props.alt}
        width={800}
        height={534}
      />
      <h2 className="text-xl font-bold my-2 text-[var(--titulo)]">
        {props.titulo}
      </h2>
      <p className="p-6 text-justify">{props.descricao}</p>
    </div>
  );
}

export default CardComImagem;
