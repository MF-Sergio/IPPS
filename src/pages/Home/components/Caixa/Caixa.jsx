export function Caixa({ icone, title, descricao }) {
  return (
    <div className="flex flex-col p-6 bg-white-100 rounded-lg border-1 border-[var(--borda)]-300 items-center justify-center w-64 content-center">
      <div className="text-2xl text-[var(--vermelho)] p-6 bg-red-100 rounded-lg mb-4 flex items-center justify-center w-16 h-16">
        {icone}
      </div>

      <h2 className="text-xl font-bold mb-4 text-preto">{title}</h2>

      <p>{descricao}</p>
    </div>
  );
}

export default Caixa;
