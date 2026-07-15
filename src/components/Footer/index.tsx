import FooterLogo from "./FooterLogo";
import FooterContato from "./FooterContato";
import FooterHorario from "./FooterHorario";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./FooterSocial";
import { footerContato, footerHorario, footerNav } from "./footerDados";

export default function Footer() {
  return (
    <footer className="text-sm border-t border-white/10 bg-[#212529] shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-10 sm:py-14">
        <div className="flex flex-col gap-10 sm:gap-12">
          <FooterLogo />

          <div className="grid grid-cols-1 gap-10 text-start sm:grid-cols-3 sm:justify-items-center sm:gap-12">
            <FooterLinks title="O IPPS" links={footerNav} />

            <FooterContato
              email={footerContato.email}
              phone={footerContato.phone}
              address={footerContato.address}
            />

            <FooterHorario hours={footerHorario} />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5 border-t border-white/10 pt-8 text-center sm:mt-10">
          <FooterSocial />

          <p className="max-w-[280px] text-[13px] leading-6 text-white/65 sm:max-w-none sm:text-sm">
            © 2026 IPPS - Instituto de Pesquisa e Promoção da Saúde. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
