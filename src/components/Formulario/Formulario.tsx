import {
  Building,
  Person,
  Envelope,
  Telephone,
  ChatLeftText,
  Send,
} from "react-bootstrap-icons";

interface FormularioProps {
  titulo: string;
  subtitulo: string;
  ehTrabalheConosco: boolean;
  tituloMensagem: string;
  subtituloMensagem: string;
}

export default function Formulario({
  titulo,
  subtitulo,
  ehTrabalheConosco,
  tituloMensagem,
  subtituloMensagem,
}: FormularioProps) {
  return (
    <section className="w-full py-12 px-4">
      <div className="mx-auto max-w-4xl rounded-[40px] bg-white p-6 md:p-12 shadow-lg">
        {/* Cabeçalho */}
        <header className="mb-12 text-center">
          <h2 className="font-serif text-4xl font-bold uppercase text-[#1E6795] md:text-6xl">
            {titulo}
          </h2>

          <p className="mt-4 text-lg text-gray-600 md:text-2xl">{subtitulo}</p>
        </header>

        <form
          className="space-y-8"
          aria-label="Formulário para parceria com o IPPS"
          action="https://formsubmit.co/84044efea8132045bcfaaefa8a233e64"
          encType="multipart/form-data"
          method="POST"
        >
          <input type="text" name="_honey" className="hidden" />
          <input
            type="hidden"
            name="_cc"
            value="ippromocaodasaude@gmail.com"
            className="hidden"
          />
          <input type="hidden" name="_next" value="https://www.ipps.com.br/" />
          {/* Empresa */}
          {!ehTrabalheConosco ? (
            <div>
              <label
                htmlFor="fempresa"
                className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
              >
                <Building size={24} className="text-[#1E6795]" />
                Nome da Empresa/Organização *
              </label>

              <input
                id="fempresa"
                name="Empresa"
                type="text"
                placeholder="Digite o nome da empresa"
                className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
                required
              />
            </div>
          ) : null}

          {/* Responsável */}
          <div>
            <label
              htmlFor="fresponsavel"
              className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
            >
              <Person size={24} className="text-[#1E6795]" />
              Nome do Responsável *
            </label>

            <input
              id="fresponsavel"
              name="Responsavel"
              type="text"
              placeholder="Digite seu nome"
              className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
              required
            />
          </div>

          {/* Email e telefone */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label
                htmlFor="femail"
                className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
              >
                <Envelope size={24} className="text-[#1E6795]" />
                E-mail *
              </label>

              <input
                id="femail"
                name="Email"
                type="email"
                placeholder="seuemail@empresa.com"
                className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
                required
              />
            </div>

            <div>
              <label
                htmlFor="ftelefone"
                className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
              >
                <Telephone size={24} className="text-[#1E6795]" />
                Telefone (Opcional)
              </label>

              <input
                id="ftelefone"
                name="Telefone"
                type="tel"
                placeholder="(21) 99999-9999"
                className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
              />
            </div>
          </div>

          {/* Área de Interesse e Linkedin */}
          {ehTrabalheConosco ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <label
                  htmlFor="farea"
                  className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
                >
                  Área de Interesse *
                </label>

                <input
                  id="farea"
                  name="Area"
                  type="text"
                  placeholder="Ex: Administração"
                  className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="flinkedin"
                  className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
                >
                  Linked In (Opcional)
                </label>

                <input
                  id="flinkedin"
                  name="linked_in"
                  type="tel"
                  placeholder="https://linkedin.com/in/seu-perfil"
                  className="h-16 w-full rounded-3xl border border-gray-300 px-6 text-lg outline-none transition focus:border-[#1E6795] focus:ring-2 focus:ring-[#1E6795]/20"
                />
              </div>
            </div>
          ) : null}

          {/* PDF */}
          {ehTrabalheConosco ? (
            <div>
              <label
                htmlFor="fcurriculo"
                className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
              >
                Currículo (PDF)
              </label>
              <input
                type="file"
                id="fcurriculo"
                name="Curriculo"
                accept=".pdf"
                required
                className="w-full text-slate-600 font-medium text-sm border border-slate-200 rounded-md cursor-pointer
         focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
         file:cursor-pointer file:border-0 file:py-2 file:px-3 file:mr-4
         file:bg-gray-100 hover:file:bg-gray-200 file:text-slate-500
         dark:text-slate-400 dark:border-neutral-700 dark:file:bg-neutral-800 dark:hover:file:bg-neutral-700"
              />
            </div>
          ) : null}

          {/* Mensagem */}
          <div>
            <label
              htmlFor="fmensagem"
              className="mb-3 flex items-center gap-3 text-xl font-semibold text-zinc-900"
            >
              <ChatLeftText size={24} className="text-[#1E6795]" />
              {tituloMensagem} (Opcional)
            </label>

            <textarea
              id="fmensagem"
              name="Mensagem"
              rows={7}
              placeholder={subtituloMensagem}
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
