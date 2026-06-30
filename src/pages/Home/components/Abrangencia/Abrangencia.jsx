import ImagemPublic from "../../../../components/ImagemPublic/ImagemPublic";
import BlocoLayout from "../../../../layout/BlocoLayout";
import { GeoAltFill } from "react-bootstrap-icons";

export function Abrangencia() {
  return (
    <BlocoLayout id="abrangencia">
      <div className="bg-[var(--verde)]/20 px-8 pb-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center gap-8 mt-6">
          <div>
            <h2 className="text-2xl font-bold  text-left titulo">
              Abrangência
            </h2>
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d166297.7395544212!2d-43.45009539631548!3d-22.924595673235263!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bdf7d1957ad17%3A0x50d02064a65075e5!2sAv.%20de%20Santa%20Cruz%2C%201631%20-%20Realengo%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2021710-255!5e0!3m2!1spt-BR!2sbr!4v1782784618192!5m2!1spt-BR!2sbr"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </BlocoLayout>
  );
}

export default Abrangencia;
