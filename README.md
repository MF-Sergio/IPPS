# IPPS — Instituto de Pesquisa e Promoção da Saúde

> Plataforma institucional e de doações do IPPS, criada para ampliar o alcance de uma organização do terceiro setor e tornar sua atuação mais acessível, transparente e conectada.

[![Site em produção](https://img.shields.io/badge/site-ipps.com.br-1f8a70?style=for-the-badge&logo=googlechrome&logoColor=white)](https://ipps.com.br/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111827)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Deploy](https://img.shields.io/badge/deploy-automated-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)](https://github.com/MF-Sergio/IPPS/actions)

## Visão geral

O IPPS atua há mais de 20 anos na promoção do bem-estar de pessoas com deficiência, de suas famílias e de pessoas em situação de vulnerabilidade social. Este projeto é a evolução digital da presença institucional da organização: uma experiência pública, responsiva e inclusiva para apresentar sua história, divulgar projetos, fortalecer parcerias, receber doações e prestar contas à sociedade.

O produto combina comunicação institucional com uma jornada de doação real, aproximando impacto social e engenharia de software. A solução foi estruturada para ser clara para quem visita o site, confiável para quem doa e sustentável para a equipe que mantém a operação.

## O que foi entregue

### Experiência institucional

- Página inicial com posicionamento, chamadas para ação e apresentação do impacto do IPPS.
- Seções de **Quem Somos**, história, missão, visão e valores.
- Apresentação de projetos, eventos e áreas de atuação.
- Páginas específicas para **Seja Parceiro**, **Trabalhe Conosco** e **Contato**.
- Política de privacidade e comunicação orientada à transparência.
- Identidade visual consistente, componentes reutilizáveis e navegação responsiva.

### Transparência e prestação de contas

A página de transparência organiza documentos institucionais, balanços, convênios e informações públicas em uma experiência navegável e acessível. O conteúdo inclui, entre outros materiais:

- Estatuto e documentos de governança.
- Atas e informações do grupo gestor.
- Balanços patrimoniais e demonstrações de resultados.
- Termos de fomento e colaboração.
- Documentos relacionados às parcerias e à prestação de contas.

### Doações online

O fluxo de doação foi evoluído de uma simples chamada institucional para uma jornada de pagamento integrada:

- Seleção de valor e método de pagamento.
- Doações por **Pix**, **boleto** e **cartão**.
- Integração com a adquirência da **Cielo**.
- Exibição de QR Code e código Pix.
- Geração e apresentação de boleto.
- Consulta do status da doação após a criação.
- Recebimento de notificações de pagamento.
- Validações de CPF, e-mail, endereço, valores e aceite de privacidade.
- Tratamento de estados como pendente, autorizada, confirmada, negada, cancelada, falha e expiração.

## Arquitetura atual

O projeto utiliza uma arquitetura web separada por responsabilidades:

```text
Interface React + TypeScript
        │
        ├── Vite: desenvolvimento e build de produção
        └── API HTTP em Node.js + TypeScript
                │
                ├── Camada de domínio de doações
                ├── Casos de uso da aplicação
                ├── Adaptador de pagamento Cielo
                ├── Persistência em PostgreSQL
                └── Adaptador para execução em Vercel
```

No back-end, o domínio financeiro não depende diretamente de HTTP, banco ou provedor de pagamento. Casos de uso, portas e adaptadores tornam o fluxo mais testável e permitem substituir detalhes de infraestrutura sem espalhar regras de negócio pela aplicação.

## Stack técnica

### Front-end

- **React 19** e **React DOM**.
- **TypeScript** com modo estrito e resolução de módulos para bundlers.
- **Vite** para desenvolvimento, build e preview.
- **React Router** para navegação entre as páginas.
- **Tailwind CSS 4** e CSS modular para a camada visual.
- **React Bootstrap Icons**, **React Icons** e **Font Awesome** para iconografia.
- **Recharts** para visualizações de dados.
- **React Responsive Carousel** para conteúdos em destaque.

### Back-end e dados

- **Node.js** com servidor HTTP nativo.
- **TypeScript** e execução de módulos ES.
- **PostgreSQL** para persistência das doações.
- **Cielo E-commerce** para processamento e acompanhamento de pagamentos.
- Configuração por variáveis de ambiente, separando credenciais e parâmetros operacionais do código.
- Repositório em memória para cenários isolados e testes.

### Qualidade e operação

- **ESLint** para consistência e análise estática.
- **Node Test Runner** para testes unitários e de integração.
- **TypeScript Compiler** para verificação de tipos da API.
- **GitHub Actions** para build e publicação contínua.
- Deploy do front-end compilado para a hospedagem de produção via FTP seguro por credenciais protegidas.
- Validação pós-deploy que confirma que o domínio está servindo o bundle de produção, e não os arquivos-fonte.

## API pública da aplicação

| Método | Rota | Responsabilidade |
|---|---|---|
| `GET` | `/api/health` | Verificação de saúde do serviço |
| `POST` | `/api/doacoes` | Criação de uma doação e início do pagamento |
| `GET` | `/api/doacoes/:id/status` | Consulta do status de uma doação |
| `POST` | `/api/cielo/notificacao` | Recebimento de notificações de pagamento da Cielo |

A API também conta com cabeçalhos de segurança, CORS controlado por ambiente, limite de requisições, limite de corpo de requisição, autenticação configurável para webhook e redaction de dados sensíveis nos logs.

## Qualidade, segurança e acessibilidade

O projeto trata qualidade como parte do produto, especialmente por lidar com dados pessoais e pagamentos:

- Regras de negócio centralizadas no domínio.
- Tipos explícitos para valores monetários, CPF, e-mail, endereço e credenciais de cartão.
- Validação de entrada e respostas de erro padronizadas.
- Proteção contra excesso de requisições.
- Separação entre configurações de sandbox e produção.
- Segredos mantidos fora do repositório.
- Redação de informações sensíveis antes do registro em logs.
- Testes para domínio, casos de uso, integração Cielo, persistência, roteamento, middleware e adaptador de execução.
- HTML semântico, textos alternativos, navegação por teclado, foco visível e componentes pensados para leitores de tela.
- Layout responsivo para dispositivos móveis, tablets e desktops.

## Indicadores de maturidade técnica

Este projeto demonstra competências relevantes para produtos digitais em produção:

- Evolução de uma presença institucional para uma plataforma transacional.
- Integração com serviço externo de pagamentos em múltiplos métodos.
- Modelagem de domínio para estados e regras financeiras.
- Separação entre interface, aplicação, domínio e infraestrutura.
- Persistência relacional e estratégia de repositórios substituíveis.
- Cobertura de testes em diferentes camadas.
- Deploy automatizado com validação do artefato publicado.
- Preocupação simultânea com acessibilidade, privacidade, segurança e experiência do usuário.

## Estrutura resumida

```text
src/
├── components/       # Componentes compartilhados da interface
├── pages/            # Experiências institucionais e fluxo de doação
├── routers/          # Rotas da aplicação web
├── assets/           # Imagens, documentos e identidade visual
└── styles/           # Estilos globais e módulos visuais

server/
├── src/
│   ├── domain/       # Entidades, regras e portas de negócio
│   ├── application/  # Casos de uso
│   ├── infrastructure/# Cielo, PostgreSQL, configuração e logs
│   └── router/       # HTTP, controllers e middlewares
└── tests/            # Testes unitários, integração e arquitetura

.github/workflows/
└── deploy.yml        # Build, publicação e validação do deploy
```

## Produto em produção

O site oficial está disponível em [ipps.com.br](https://ipps.com.br/). A plataforma é utilizada para comunicação institucional, relacionamento com parceiros, divulgação de oportunidades e captação de doações para as iniciativas do IPPS.

## Créditos

Projeto desenvolvido voluntariamente para o **Instituto de Promoção e Proteção Social (IPPS)**, com foco em transformação digital, inclusão e fortalecimento do terceiro setor.

- [Sergio Mendes — GitHub](https://github.com/MF-Sergio)
- [Lucas Hideaki — GitHub](https://github.com/Twistywasabi)
- [Julio Vieira — GitHub](https://github.com/JulioVieiraP)
- [Repositório do projeto](https://github.com/MF-Sergio/IPPS)

---

**Tecnologia com propósito: uma presença digital mais acessível, transparente e preparada para ampliar o impacto social do IPPS.**
