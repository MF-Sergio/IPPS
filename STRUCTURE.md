# 📱 IPPS - Instituto de Pesquisa e Promoção da Saúde

Bem-vindo ao repositório do site da IPPS! Este é um guia para entender como o projeto está estruturado. Você não precisa saber React para navegar no código - vamos explicar tudo de forma simples!

---

## 🚀 Como Rodar o Projeto

### Primeiro acesso
```bash
npm install      # Baixa todas as dependências
npm run dev      # Inicia o servidor de desenvolvimento
```

O site abrirá em `http://localhost:5173` 🌐

### Parar o servidor
Aperte `CTRL + C` no terminal

---

## 📂 Estrutura de Pastas Explicada

```
IPPS/
├── src/                    # ← AQUI FICA O CÓDIGO PRINCIPAL
│   ├── components/         # Componentes GLOBAIS reutilizáveis
│   │   ├── Header/         # Cabeçalho (logo + menu)
│   │   └── Footer/         # Rodapé
│   ├── pages/              # Páginas completas
│   │   └── Home/
│   │       ├── index.tsx   # Componente principal da página
│   │       └── components/ # Componentes LOCAIS da página
│   │           ├── Hero/
│   │           │   └── index.tsx
│   │           ├── Numeros/
│   │           │   └── index.tsx
│   │           └── Projetos/
│   │               └── index.tsx
│   ├── assets/             # Arquivos de mídia
│   │   ├── img/            # Imagens, logos
│   │   ├── doc/            # Documentos em PDF
│   │   └── background/     # Imagens de fundo
│   ├── routers/            # Define as rotas (URLs) do site
│   ├── App.jsx             # Arquivo principal do site
│   ├── main.jsx            # Entrada da aplicação
│   └── index.css           # Estilos globais
├── pages/                  # Páginas HTML antigas (será removido)
├── public/                 # Arquivos públicos (favicon, ícones)
├── package.json            # Lista de dependências e scripts
├── vite.config.js          # Configuração do compilador
└── STRUCTURE.md            # Documentação de estrutura
```

---

## 🎯 O Que É Cada Coisa?

### **React** - O Motor do Site
Pense no React como LEGO. Você constrói pequenas peças (componentes) e as encaixa para formar a página inteira.

### **Vite** - O Compilador
Ele transforma o código que você escreve em um site que o navegador entende. Também faz o site ficar rápido ⚡

### **Tailwind CSS** - Estilos
Sistema de classes que deixa o site bonito. Exemplo: `className="mt-4 px-6"` significa "margem de topo + preenchimento lateral"

---

## 🏗️ Anatomia de um Componente

Os componentes ficam em `src/components/`. Vamos ver um exemplo:

**Arquivo:** `src/components/Header/index.tsx`

```jsx
export default function Header() {
  return (
    <header className="w-full bg-white">
      {/* Este é o cabeçalho do site */}
      <div className="container mx-auto px-4 py-6">
        <img src={logo} alt="Logo" className="h-16" />
      </div>
    </header>
  )
}
```

**O que significa:**
- `export default function Header()` - Declara um componente chamado "Header"
- `return (<div>...)` - O que aparece na tela
- `className="..."` - Estilos (Tailwind CSS)
- tudo que vem antes do `return` da função é javascript/typescript então toda a logica fica ali

---

## 📄 Estrutura de Páginas

As páginas ficam em `src/pages/`. Cada página tem:
- Um arquivo principal (`index.tsx`)
- Uma pasta `components/` com componentes locais (sessões específicas)

**Como montamos a Home (exemplo real):**

**Arquivo:** `src/pages/Home/index.tsx`
```jsx
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />           {/* Sessão Hero */}
      {/* Adicione mais componentes de sessões aqui */}
    </div>
  )
}
```

**Arquivo:** `src/pages/Home/components/Hero/index.tsx`
```jsx
export default function Hero() {
  return (
    <section className="container mx-auto">
      {/* Conteúdo específico da sessão Hero */}
    </section>
  )
}
```

**Por que organizar assim?**
- ✅ Cada sessão da página é um componente separado
- ✅ Componentes locais (Hero, Números) ficam junto com a página
- ✅ Componentes globais (Header, Footer) ficam em `src/components/`
- ✅ Código mais organizado e fácil de manter

---

## 🚦 Como o Site Funciona (Rotas)

**Arquivo:** `src/routers/index.tsx`

Define qual componente aparece em cada URL:

```
/ (home)          → Mostra a página Home
/doeagora         → Mostra a página de doações
/historia         → Mostra a história da IPPS
/transparencia    → Mostra info de transparência
```

---

## 🎨 Adicionando Estilos

Usa-se **Tailwind CSS**. Exemplos de classes:

| Classe | O que faz |
|--------|-----------|
| `mt-4` | Margem de topo (espaço acima) |
| `px-6` | Preenchimento lateral (espaço dos lados) |
| `bg-white` | Fundo branco |
| `text-lg` | Texto grande |
| `flex` | Alinha itens em linha |
| `grid` | Cria grade de itens |

**Exemplo:**
```jsx
<div className="mt-8 mb-4 px-6 py-4 bg-blue-50 rounded-lg">
  Conteúdo
</div>
```

---

## 📁 Onde Adicionar Coisas Novas

### ✅ Nova página?
1. Crie a pasta `src/pages/NomeDaPagina/`
2. Crie o arquivo `src/pages/NomeDaPagina/index.tsx` com o componente principal
3. Adicione a rota em `src/routers/index.tsx`

### ✅ Nova sessão em uma página existente?
1. Crie a pasta `src/pages/NomeDaPagina/components/NomeSessao/`
2. Crie o arquivo `src/pages/NomeDaPagina/components/NomeSessao/index.tsx`
3. Importe e use em `src/pages/NomeDaPagina/index.tsx`

**Exemplo (adicionando Números à Home):**
```jsx
// src/pages/Home/components/Numeros/index.tsx
export default function Numeros() {
  return (
    <section className="py-20 bg-gray-50">
      {/* Conteúdo da sessão */}
    </section>
  )
}

// Depois, adicione em src/pages/Home/index.tsx:
import Numeros from "./components/Numeros";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Numeros />  {/* ← Novo! */}
    </div>
  )
}
```

### ✅ Novo componente GLOBAL reutilizável?
1. Crie em `src/components/NovoComponente/index.tsx`
2. Use em qualquer página/componente

### ✅ Novas imagens?
1. Salve em `src/assets/img/`
2. Importe no código: `import foto from '@assets/img/foto.png'`

### ✅ Novo documento (PDF)?
1. Salve em `src/assets/doc/`
2. Crie um link: `<a href="/seu-documento.pdf">Download</a>`

---

## 📚 Leitura de Um Arquivo React

**Ordem de leitura (de cima para baixo):**
```jsx
// 1. Importações (o que você precisa)
import Header from './componentes/Header'
import { useState } from 'react'

// 2. Definição do componente (a função)
export default function MinhaPage() {
  
  // 3. Lógica interna (se houver)
  const [contador, setContador] = useState(0)
  
  // 4. O que aparece na tela
  return (
    <div>
      <Header />
      <p>Cliques: {contador}</p>
    </div>
  )
}
```

---

## 🛠️ Comandos Úteis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Prepara o site para produção
npm run preview  # Visualiza a build de produção localmente
npm run lint     # Verifica erros de código
```

---

## 📞 Dúvidas Sobre Estrutura?

- **O que é a pasta `node_modules/`?** Dependências do projeto (geralmente não é alteravel diretamente trabalhamos apenas com o `src`)
- **O que é `.gitignore`?** Lista de arquivos que NÃO vão ao GitHub
- **O que é `package.json`?** Lista de todas as libs que o projeto usa

---

## ⚡ Dicas Importantes

1. **Sempre rode `npm install` depois de fazer pull** - Pode ter dependências novas
2. **Não delete a pasta `node_modules/`** - Rode `npm install` de novo se isso acontecer
3. **Tailwind não está funcionando?** - Limpe o cache: apague `.next` ou `dist/` e rode `npm run dev` de novo

---

Pronto! Agora você consegue navegar no código! 🎉
