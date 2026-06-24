export function CardComIcone({
  icone,
  title,
  descricao,
  bgColor = "bg-[var(--fundo)]",
  iconBgColor = "bg-red-100",
  iconColor = "text-red-600",
}) {
  return (
    <div
      className={`flex flex-col p-6 rounded-lg shadow-md items-start justify-start w-64 content-start ${bgColor} text-left`}
    >
      {/* Adicionamos `[&>svg]:w-8 [&>svg]:h-8` para dizer ao Tailwind: 
        "Qualquer SVG que estiver diretamente dentro desta div deve ter tamanho 8 (32px)"
      */}
      <div
        className={`p-2 rounded-lg mb-4 flex items-center justify-center w-16 h-16 ${iconBgColor} ${iconColor} [&>svg]:w-8 [&>svg]:h-8`}
      >
        {icone}
      </div>

      <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>

      <p>{descricao}</p>
    </div>
  );
}
