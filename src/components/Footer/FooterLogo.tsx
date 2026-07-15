import Logo from "../Logo/Logo";

export default function FooterLogo() {
  return (
    <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
      <Logo variant="default" imageClassName="h-16 w-auto shrink-0" />

      <p className="max-w-[320px] text-[13px] leading-6 text-white/90 sm:max-w-none sm:text-sm">
        Instituto de Pesquisa e Promoção da Saúde. Desde 2002 promovendo
        inclusão, cidadania e autonomia para pessoas com deficiência.
      </p>
    </div>
  );
}
