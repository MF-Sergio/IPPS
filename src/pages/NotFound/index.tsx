import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-5 flex min-h-[50vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <h1 className="text-4xl font-bold text-[var(--titulo)]">Página não encontrada</h1>
      <p className="text-lg">O endereço acessado não existe ou foi alterado.</p>
      <Link
        to="/"
        className="rounded-xl bg-[#216587] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#1b5570]"
      >
        Voltar para o início
      </Link>
    </section>
  );
}
