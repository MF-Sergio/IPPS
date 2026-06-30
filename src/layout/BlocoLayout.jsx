export function BlocoLayout({ children, titulo, id }) {
  return (
    <section
      id={id}
      className="flex flex-col content-center justify-center bg-[var(--fundo)] py-8"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center titulo">{titulo}</h2>
      </div>
      {children}
    </section>
  );
}

export default BlocoLayout;
