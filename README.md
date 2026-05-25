# 🎬 Trabalho Frontend — Locadora de Filmes & Jogos Antigos

> Aplicação web desenvolvida em React simulando o sistema de uma locadora de filmes e jogos antigos. Projeto final da disciplina de Desenvolvimento Frontend.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5+-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3+-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-1+-6E9F18?style=flat-square&logo=vitest&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Rotas da Aplicação](#-rotas-da-aplicação)
- [API Mock](#-api-mock)
- [Fluxo de Trabalho](#-fluxo-de-trabalho)
- [Padrão de Commits](#-padrão-de-commits)
- [Testes](#-testes)
- [Figma](#-wireframe-figma)

---

## 📖 Sobre o Projeto

Este projeto é o trabalho final da disciplina de Desenvolvimento Frontend. A aplicação simula o sistema de uma locadora de filmes e jogos antigos, permitindo cadastrar e listar itens do acervo.

A aplicação foi desenvolvida com foco nos seguintes conceitos:

- Navegação com roteamento no React (React Router DOM)
- Formulário controlado com validação de campos
- Gerenciamento de estado compartilhado entre páginas via Context API
- Integração com API REST mockada (json-server)
- Estilização responsiva com Tailwind CSS

---

## ✅ Funcionalidades

- [x] Menu de navegação com três páginas (Início, Cadastro e Listagem)
- [x] Formulário de cadastro de filmes e jogos com validação
- [x] Campo condicional "Plataforma" exibido apenas para jogos
- [x] Listagem dinâmica com filtro por tipo (Todos / Filmes / Jogos)
- [x] Estado compartilhado entre páginas via Context API
- [x] Integração com API REST mockada via json-server
- [x] Layout responsivo para mobile e desktop

---

## 🛠 Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| [React](https://react.dev/) | 18+ | Biblioteca principal de UI |
| [Vite](https://vitejs.dev/) | 5+ | Bundler e servidor de desenvolvimento |
| [React Router DOM](https://reactrouter.com/) | 6+ | Roteamento entre páginas |
| [Tailwind CSS](https://tailwindcss.com/) | 3+ | Estilização utilitária |
| [json-server](https://github.com/typicode/json-server) | 0.17+ | API REST mockada |
| [Vitest](https://vitest.dev/) | 1+ | Framework de testes |
| [React Testing Library](https://testing-library.com/) | 14+ | Testes de componentes |

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) — versão **18 ou superior**
- [npm](https://www.npmjs.com/) — versão **9 ou superior** (já vem com o Node.js)
- [Git](https://git-scm.com/)

Para verificar se já possui as versões corretas, execute:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/trabalho-frontend.git
```

### 2. Acesse a pasta do projeto

```bash
cd trabalho-frontend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie a API mock (json-server)

> ⚠️ **Importante:** a API precisa estar rodando para que a listagem de itens funcione corretamente. Abra um terminal separado para este comando.

```bash
npm run server
```

A API ficará disponível em: `http://localhost:3001`

### 5. Inicie a aplicação

Em outro terminal, execute:

```bash
npm run dev
```

A aplicação ficará disponível em: `http://localhost:5173`

> 💡 Você precisará de **dois terminais abertos** simultaneamente: um para a API e outro para a aplicação.

---

## 📁 Estrutura de Pastas

```
trabalho-frontend/
├── public/
├── src/
│   ├── components/        # Componentes reutilizáveis (Navbar, Loading, etc.)
│   ├── context/           # Context API (LocadoraContext)
│   ├── data/              # Dados estáticos auxiliares
│   ├── pages/             # Páginas da aplicação (Home, Cadastro, Listagem)
│   ├── services/          # Funções de integração com a API (api.js)
│   ├── tests/             # Testes unitários e de integração
│   │   ├── components/
│   │   ├── context/
│   │   ├── integration/
│   │   ├── pages/
│   │   ├── services/
│   │   └── setup.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── db.json                # Banco de dados da API mock
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🗺 Rotas da Aplicação

| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Página inicial com boas-vindas e contadores do acervo |
| `/cadastro` | Cadastro | Formulário para cadastrar filmes e jogos |
| `/listagem` | Listagem | Exibição e filtragem de todos os itens do acervo |

---

## 🔌 API Mock

A API mock é gerada pelo `json-server` a partir do arquivo `db.json` na raiz do projeto.

**Base URL:** `http://localhost:3001`

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/filmes` | Lista todos os filmes |
| `POST` | `/filmes` | Cadastra um novo filme |
| `GET` | `/jogos` | Lista todos os jogos |
| `POST` | `/jogos` | Cadastra um novo jogo |

**Exemplo de objeto filme:**
```json
{
  "id": 1,
  "titulo": "Jurassic Park",
  "genero": "Aventura",
  "ano": 1993,
  "disponivel": true
}
```

**Exemplo de objeto jogo:**
```json
{
  "id": 1,
  "titulo": "Crash Bandicoot",
  "genero": "Plataforma",
  "plataforma": "PS1",
  "ano": 1996,
  "disponivel": true
}
```

---

## 🌿 Fluxo de Trabalho

Este projeto segue um fluxo de trabalho baseado em branches. **Nunca trabalhe diretamente na branch `main`.**

### Passo a passo para cada tarefa

**1. Certifique-se de estar com a `main` atualizada antes de criar sua branch:**

```bash
git checkout main
git pull origin main
```

**2. Crie sua branch a partir da `dev` seguindo o padrão de nomenclatura:**

```bash
git checkout -b tipo/descricao-em-ingles
```

**3. Desenvolva sua tarefa, fazendo commits organizados ao longo do trabalho.**

**4. Ao finalizar, envie sua branch para o repositório remoto:**

```bash
git push origin tipo/descricao-em-ingles
```

**5. Abra um Pull Request no GitHub** apontando sua branch para a `dev` e aguarde revisão.

---

### 📌 Padrão de nomenclatura de branches

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feat/` | Nova funcionalidade | `feat/home-component` |
| `feat/` | Nova página | `feat/cadastro-page` |
| `feat/` | Nova integração | `feat/api-service` |
| `fix/` | Correção de bug | `fix/form-validation` |
| `fix/` | Ajuste de layout | `fix/navbar-mobile` |
| `doc/` | Documentação | `doc/update-readme` |
| `test/` | Testes | `test/context-unit` |
| `chore/` | Configuração/setup | `chore/tailwind-setup` |

> ⚠️ **Atenção:** use sempre letras minúsculas, sem espaços e com hífen separando as palavras. Descreva em inglês o que foi feito.

---

## 📝 Padrão de Commits

As mensagens de commit devem seguir o padrão **Conventional Commits**:

```
tipo: descrição curta em português ou inglês
```

| Tipo | Quando usar |
|---|---|
| `feat:` | Adição de nova funcionalidade |
| `fix:` | Correção de bug |
| `style:` | Alterações de estilo/layout sem mudança de lógica |
| `refactor:` | Refatoração de código sem mudança de comportamento |
| `test:` | Adição ou correção de testes |
| `docs:` | Alterações na documentação |
| `chore:` | Configurações, dependências, setup |

**Exemplos:**
```bash
git commit -m "feat: criar componente Navbar com links de navegação"
git commit -m "fix: corrigir validação de campo obrigatório no formulário"
git commit -m "test: adicionar testes unitários para LocadoraContext"
git commit -m "docs: atualizar README com instruções de instalação"
```

> 💡 Commits devem ser pequenos e descritivos. Evite commits com mensagens vagas como `"ajustes"`, `"correções"` ou `"wip"`.

---

## 🧪 Testes

O projeto utiliza **Vitest** com **React Testing Library** para testes unitários e de integração.

### Rodar todos os testes

```bash
npm test
```

### Rodar testes com interface visual

```bash
npm run test:ui
```

### Rodar testes com relatório de cobertura

```bash
npm run test:coverage
```

### Estrutura de testes

```
src/tests/
├── setup.js                          # Configuração global do ambiente de testes
├── smoke.test.jsx                    # Teste básico de sanidade
├── services/
│   └── api.test.js                   # Testes unitários das funções de API
├── context/
│   └── LocadoraContext.test.jsx      # Testes unitários do contexto global
├── components/
│   └── Navbar.test.jsx               # Testes unitários do componente Navbar
├── pages/
│   └── Cadastro.test.jsx             # Testes unitários do formulário
└── integration/
    ├── cadastroListagem.test.jsx     # Fluxo completo cadastro → listagem
    ├── filtragemListagem.test.jsx    # Testes dos filtros da listagem
    └── validacaoFormulario.test.jsx  # Fluxo completo de validação
```

# Wireframe Figma

Acesse o wireframe e identidade visual do projeto no Figma:

[Locadora — Wireframe](https://www.figma.com/design/rkQ5q20CbDefD4eDt6uwDx/Locadora-%E2%80%94-Wireframe?node-id=3809-92&t=X8rXuA8TUmE0aZC0-1)

<sub>⚠️ Wireframe ainda em aprimoramento e sujeito a alterações.</sub>

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos.
