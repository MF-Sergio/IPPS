export function BlocoLayout({ children, titulo }) {
  return (
    <div className="bg-[var(--fundo)] py-8 ">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center titulo">{titulo}</h2>
      </div>
      {children}
    </div>
  );
}

export default BlocoLayout;
