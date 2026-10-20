import BlocoLayout from "../../../../layout/BlocoLayout";
import Carrossel from "../carrossel/carrossel";
import img1 from "../../../../assets/img/logos/ADB.webp?no-inline";
import img2 from "../../../../assets/img/logos/BancoDeAlimentos.webp?no-inline";
import img3 from "../../../../assets/img/logos/CLinicaECB.webp?no-inline";
import img4 from "../../../../assets/img/logos/FebiexLogo.webp?no-inline";
import img5 from "../../../../assets/img/logos/LogoSMPD.webp?no-inline";
import img6 from "../../../../assets/img/logos/MesaBrasilSesc.webp?no-inline";
import img7 from "../../../../assets/img/logos/PJERJ.webp?no-inline";
import img8 from "../../../../assets/img/logos/Sesc.webp?no-inline";
import img9 from "../../../../assets/img/logos/UCBLogo.webp?no-inline";

export function OutrosParceiros() {
  return (
    <BlocoLayout id="parceiros" titulo="Nossos parceiros">
      <h2 className="text-3xl font-bold mb-4">
        Juntos ampliamos o nosso impacto
      </h2>
      <p className="text-lg mb-6 w-3/4 mx-auto">
        Unimos forças com organizações que compartilham nosso compromisso com o
        desenvolvimento social e a promoção da cidadania.
      </p>
      <section className="mx-auto w-full max-w-7xl">
        <Carrossel
          imagens={[img1, img2, img3, img4, img5, img6, img7, img8, img9]}
          imagensPorSlide={3}
          isOutrosParceiros={true}
          alts={[
            "Agência do Bem",
            "Banco de Alimentos",
            "Clínica Escola Castelo Branco",
            "FEBIEX",
            "Secretaria Municipal da Pessoa com Deficiência (Rio)",
            "Mesa Brasil Sesc",
            "Tribunal de Justiça do Estado do Rio de Janeiro",
            "Sesc",
            "Universidade Castelo Branco",
          ]}
        />
      </section>
    </BlocoLayout>
  );
}
