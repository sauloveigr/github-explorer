# GitHub Explorer

Aplicação client-side que consome a API do GitHub e exibe os repositórios mais populares de um usuário.

<img width="1904" height="999" alt="image" src="https://github.com/user-attachments/assets/7006bc4c-af3a-445b-8208-df6b6726b3be" />

## Demo

🔗 [Link da aplicação](https://gh-repository-explorer.vercel.app/)

## Tecnologias

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Bootstrap 5](https://getbootstrap.com/)
- [clsx](https://github.com/lukeed/clsx)

## Funcionalidades

- Busca de usuários do GitHub
- Exibição de detalhes do usuário (avatar, bio, seguidores, seguindo, repositórios, localização e e-mail)
- Listagem de repositórios ordenados por estrelas (decrescente)
- Ordenação por estrelas, nome ou data de atualização — crescente ou decrescente
- Página de detalhes do repositório com link externo para o GitHub
- Histórico de buscas recentes
- Skeleton loading durante o carregamento
- Layout responsivo para mobile e desktop

## Instalação

**Pré-requisitos:** Node.js 18+ e [Yarn](https://yarnpkg.com/)

```bash
# Clone o repositório
git clone https://github.com/sauloveigr/github-explorer.git

# Entre na pasta do projeto
cd github-explorer

# Instale as dependências
yarn
```

## Executando o projeto

```bash
# Inicia o servidor de desenvolvimento
yarn dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

```bash
# Gerar build de produção
yarn build

# Visualizar o build localmente
yarn preview
```

## Estrutura do projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Component.tsx
│   └── Component.module.css
├── hooks/               # Custom hooks (useUser, useRepositories)
├── pages/               # Páginas da aplicação
│   ├── Page.tsx
│   └── Page.module.css
├── router/              # Configuração de rotas
├── services/            # Integração com a API do GitHub
├── types/               # Tipagens TypeScript
└── utils/               # Funções utilitárias
    ├── date.ts          # Formatação de datas
    ├── history.ts       # Histórico de buscas (localStorage)
    ├── langColors.ts    # Cores por linguagem de programação
    └── sort.ts          # Comparadores de ordenação
```

## APIs utilizadas

| Endpoint                      | Descrição                  |
| ----------------------------- | -------------------------- |
| `GET /users/{username}`       | Detalhes do usuário        |
| `GET /users/{username}/repos` | Repositórios do usuário    |
| `GET /repos/{full_name}`      | Detalhes de um repositório |
