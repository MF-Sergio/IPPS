type FooterHorarioProps = {
  hours: string;
};

export default function FooterHorario({ hours }: FooterHorarioProps) {
  return (
    <section>
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/95">
        Horário de funcionamento
      </h3>

      <p className="mt-6 text-sm leading-6 text-white/85">
        {hours}
      </p>
    </section>
  );
}
