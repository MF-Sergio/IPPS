type FooterHorarioProps = {
  hours: string;
};

export default function FooterHorario({ hours }: FooterHorarioProps) {
  return (
    <section className="w-full max-w-[320px] sm:max-w-none">
      <h3 className="text-center text-[16px] font-semibold tracking-[0.16em] sm:text-left">
        HORÁRIO DE FUNCIONAMENTO
      </h3>

      <p className="mt-5 text-center text-[15px] leading-6 sm:text-left sm:text-sm">
        {hours}
      </p>
    </section>
  );
}
