import Logo from '../Logo/Logo';

export default function FooterLogo() {
  return (
    <div className="max-w-sm">
      <Logo variant="default" imageClassName="h-24 w-auto" />

      <p className="mt-5 text-sm leading-6 text-white/85">
        Instituto de Pesquisa e Promoção da Saúde. Desde 2002 promovendo inclusão, cidadania e autonomia para pessoas com deficiência.
      </p>
    </div>
  );
}
