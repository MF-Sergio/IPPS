import {
  Building,
  Person,
  Envelope,
  Telephone,
  ChatLeftText,
  Send,
} from "react-bootstrap-icons";

export default function Formulario() {
  return (
    <section className="w-full py-12 px-4">
      <div className="mx-auto max-w-4xl rounded-[40px] bg-white p-6 md:p-12 shadow-lg">
        {/* Cabeçalho */}
        <header className="mb-12 text-center">
          <h2 className="font-serif text-4xl font-bold uppercase text-[#1E6795] md:text-6xl">
            Quero Ser Parceiro
          </h2>

          <p className="mt-4 text-lg text-gray-600 md:text-2xl">
            Preencha o formulário e nossa equipe entrará em contato
          </p>
        </header>

        <form
          className="space-y-8"
          aria-label="Formulário para parceria com o IPPS"
        >
          {/* Empresa */}
          <div>
            <label
              htmlFor="empresa"
              className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
            >
              <Building size={24} className="text-[#1E6795]" />
              Nome da Empresa/Organização
            </label>

            <input
              id="empresa"
              type="text"
              placeholder="Digite o nome da empresa"
              className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
            />
          </div>

          {/* Responsável */}
          <div>
            <label
              htmlFor="responsavel"
              className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
            >
              <Person size={24} className="text-[#1E6795]" />
              Nome do Responsável
            </label>

            <input
              id="responsavel"
              type="text"
              placeholder="Digite seu nome"
              className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
            />
          </div>

          {/* Email e telefone */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
              >
                <Envelope size={24} className="text-[#1E6795]" />
                E-mail
              </label>

              <input
                id="email"
                type="email"
                placeholder="seuemail@empresa.com"
                className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
              />
            </div>

            <div>
              <label
                htmlFor="telefone"
                className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
              >
                <Telephone size={24} className="text-[#1E6795]" />
                Telefone
              </label>

              <input
                id="telefone"
                type="tel"
                placeholder="(21) 99999-9999"
                className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
              />
            </div>
          </div>

          {/* Mensagem */}
          <div>
            <label
              htmlFor="mensagem"
              className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
            >
              <ChatLeftText size={24} className="text-[#1E6795]" />
              Mensagem
            </label>

            <textarea
              id="mensagem"
              rows={7}
              placeholder="Conte-nos como sua empresa pode contribuir com o IPPS"
              className="w-full rounded-3xl border border-gray-300 p-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="flex h-20 w-full items-center justify-center gap-4 rounded-3xl bg-[#B80000] text-2xl font-bold text-white transition hover:bg-[#990000]"
          >
            Enviar Proposta
            <Send size={28} />
          </button>
        </form>
      </div>
    </section>
  );
}
