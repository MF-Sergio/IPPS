import Logo from '../Logo/Logo';

export default function FooterLogo() {
  return (
    <div className="flex w-full items-center justify-center gap-5">
      <Logo variant="default" imageClassName="h-16 w-auto shrink-0" />

      <p className="font-regular text-sm leading-6">
        Instituto de Pesquisa e Promoção da Saúde. Desde 2002 promovendo inclusão, cidadania e autonomia para pessoas com deficiência.
      </p>
    </div>
  );
}
