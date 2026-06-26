type FooterHorarioProps = {
  hours: string;
};

export default function FooterHorario({ hours }: FooterHorarioProps) {
  return (
    <section>
      <h3 className="font-semibold tracking-[0.18em]">
        Horário de funcionamento
      </h3>

      <p className="mt-4 leading-6">
        {hours}
      </p>
    </section>
  );
}
