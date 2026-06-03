export function Caixa({ icone, title, descricao }) {
  return (
    <div className="p-6 bg-white-100 rounded-lg shadow-md items-center justify-center w-64">
      <div className="p-6 bg-red-100 rounded-lg shadow-md mb-4 flex items-center justify-center w-16 h-16">
        {icone}
      </div>

      <h2 className="text-xl font-bold mb-4 text-[var(--titulo)]">{title}</h2>

      <p>{descricao}</p>
    </div>
  );
}

export default Caixa;
