import ImagemPublic from "../../../../components/ImagemPublic/ImagemPublic";
import BlocoLayout from "../../../../layout/BlocoLayout";
import { GeoAltFill } from "react-bootstrap-icons";

export function Abrangencia() {
  return (
    <BlocoLayout id="abrangencia">
      <div className="bg-[var(--verde)]/20 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold  text-left titulo">Abrangência</h2>
        <div className="flex justify-between items-start gap-8 mt-6">
          <div>
            <h1 className="text-2xl font-bold mb-8 text-left ">
              Presente onde mais importa
            </h1>
            <p className="mb-4 text-justify">
              Nossa atuação concentra-se na Zona Oeste do Rio de Janeiro,
              especialmente em Realengo e regiões adjacentes, onde atendemos
              comunidades com altos índices de vulnerabilidade social. Cada
              bairro representa famílias que confiam em nosso trabalho e
              fortalecem nossa missão diariamente.
            </p>
            <span className="flex items-center gap-2 text-[var(--titulo)]">
              <GeoAltFill></GeoAltFill>
              <p>Zona- Oeste - Rio de Janeiro - RJ</p>
            </span>
          </div>
          <div>
            <ImagemPublic nomeImagem="mapa_realengo.png"></ImagemPublic>
          </div>
        </div>
      </div>
    </BlocoLayout>
  );
}

export default Abrangencia;
