import FooterLogo from "./FooterLogo";
import FooterContato from "./FooterContato";
import FooterHorario from "./FooterHorario";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import { footerContato, footerHorario, footerNav } from "./footerDados";

export default function Footer() {
  return (
    <footer className="text-sm border-t border-white/10 bg-[#212529] shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="mx-auto w-full max-w-7xl px-10 py-14">
        <div className="flex flex-col gap-12">
          <FooterLogo />

          <div className="grid grid-cols-3 justify-items-center gap-12 text-start">
            <FooterLinks title="Navegação" links={footerNav} />

            <FooterContato
              email={footerContato.email}
              phone={footerContato.phone}
              address={footerContato.address}
            />

            <FooterHorario hours={footerHorario} />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5 pt-8 text-center">
          {/* <FooterSocial /> */}

          <p className="text-sm">
            © 2026 IPPS - Instituto de Pesquisa e Promoção da Saúde. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
