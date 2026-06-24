import FooterLogo from './FooterLogo';
import FooterContato from './FooterContato';
import FooterHorario from './FooterHorario';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';
import { footerContato, footerHorario, footerNav } from './footerDados';

export default function Footer() {
  return (
    <footer className="mt-20 rounded-t-[32px] border-t border-white/10 bg-[#4a4a4a] text-white shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.3fr_1.25fr_0.9fr] lg:gap-10">
          <FooterLogo />

          <FooterLinks title="O IPPS" links={footerNav} />

          <FooterContato
            address={footerContato.address}
            email={footerContato.email}
            phone={footerContato.phone}
            cnpj={footerContato.cnpj}
          />

          <FooterHorario hours={footerHorario} />
        </div>

        <div className="mt-12 flex flex-col items-center gap-5 border-t border-white/10 pt-8 text-center">
          <FooterSocial />

          <p className="text-sm text-white/75">
            © 2026 IPPS - Instituto de Pesquisa e Promoção da Saúde. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
