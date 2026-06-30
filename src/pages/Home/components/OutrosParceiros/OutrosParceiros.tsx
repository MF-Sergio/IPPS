import BlocoLayout from "../../../../layout/BlocoLayout";
import Carrossel from "../carrossel/carrossel";
import img1 from "../../../../assets/img/logos/ADB.png";
import img2 from "../../../../assets/img/logos/BancoDeAlimentos.png";
import img3 from "../../../../assets/img/logos/CLinicaECB.png";
import img4 from "../../../../assets/img/logos/FebiexLogo.jpg";
import img5 from "../../../../assets/img/logos/LogoSMPD.png";
import img6 from "../../../../assets/img/logos/MesaBrasilSesc.png";
import img7 from "../../../../assets/img/logos/PJERJ.jpg";
import img8 from "../../../../assets/img/logos/Sesc.png";
import img9 from "../../../../assets/img/logos/UCBLogo.jpg";

export function OutrosParceiros() {
  return (
    <BlocoLayout>
      <h2 className="text-3xl font-bold mb-4">
        Juntos ampliamos o nosso impacto
      </h2>
      <p className="text-lg mb-6 w-3/4 mx-auto">
        Unimos forças com organizações que compartilham nosso compromisso com o
        desenvolvimento social e a promoção da cidadania.
      </p>
      <Carrossel
        imagens={[img1, img2, img3, img4, img5, img6, img7, img8, img9]}
        imagensPorSlide={8}
        isOutrosParceiros={true}
      />
    </BlocoLayout>
  );
}
