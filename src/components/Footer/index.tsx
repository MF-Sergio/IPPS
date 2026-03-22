import { FiAtSign, FiMapPin, FiPhone } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#212529] text-white pb-6 pt-16 mt-20 border-t flex items-center justify-center" style={{ fontFamily: 'Inter' }}>
      <div className="container mx-auto px-4">
        <div className="grid gap-32 md:grid-cols-4">
          <div className="flex flex-col">
            <img src="./src/assets/img/logo.png" alt="IPPS Logo" width='89px' />
            <p className="mt-4 text-sm font-normal">
              Instituto de Pesquisa e Promoção da Saúde. Desde 2002 promovendo inclusão, cidadania e autonomia para pessoas com deficiência.
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Navegação</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li><a href="#" className="text-sm font-normal hover:underline">Quem somos</a></li>
              <li><a href="#" className="text-sm font-normal hover:underline">Nosso impacto</a></li>
              <li><a href="#" className="text-sm font-normal hover:underline">Nossos projetos</a></li>
              <li><a href="#" className="text-sm font-normal hover:underline">Abragência</a></li>
              <li><a href="#" className="text-sm font-normal hover:underline">Transparência</a></li>
              <li><a href="#" className="text-sm font-normal hover:underline">Parceiros</a></li>
              <li><a href="#" className="text-sm font-normal hover:underline">Eventos</a></li>
              <li><a href="#" className="text-sm font-normal hover:underline">Trabalhe conosco</a></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4">Contato</h3>
            <p className="text-sm font-normal mb-2 flex gap-2">
              <FiMapPin size={24}/>
              Endereço: Avenida de Santa Cruz 1631 / Rio de Janeiro / Bairro: Realengo / CEP: 21.710-255
            </p>
            <p className="text-sm font-normal mb-2 flex items-center gap-2">
              <FiAtSign />
              ippromocaodasaude@gmail.com
            </p>
            <p className="text-sm font-normal mb-2 flex items-center gap-2">
              <FiPhone />
              Telefone: (11) 1234-5678
            </p>
          </div>

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Horário de funcionamento</h3>
            <p className="text-sm font-normal mb-2">Segunda a Sexta das 8h às 17:48h</p>
          </div>
        </div>

        <div className="flex items-center justify-center mt-28">
          <p className="text-sm font-normal">&copy; 2026 IPPS - Instituto de Pesquisa e Promoção da Saúde. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
