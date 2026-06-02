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
- [Redux Toolkit](https://redux-toolkit.js.org/) — RTK Query para data fetching + slice para estado global
- [Axios](https://axios-http.com/) — cliente HTTP com interceptors para tratamento de erros
- [Bootstrap 5](https://getbootstrap.com/)
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)

## Funcionalidades

- Busca de usuários do GitHub
- Exibição de detalhes do usuário (avatar, bio, seguidores, seguindo, repositórios, localização e e-mail)
- Listagem de repositórios ordenados por estrelas (decrescente)
- Ordenação por estrelas, nome ou data de atualização — crescente ou decrescente
- Página de detalhes do repositório com link externo para o GitHub
- Histórico de buscas recentes (persistido no localStorage via Redux)
- Skeleton loading durante o carregamento
- Cache automático de requisições via RTK Query
- Layout responsivo para mobile e desktop
- Error Boundary global para erros de renderização inesperados

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

## Testes

```bash
# Executa todos os testes
yarn test

# Modo watch (re-executa ao salvar)
yarn test:watch
```

44 testes cobrindo utilitários, componentes, store Redux e slice de histórico.

## Estrutura do projeto

```
src/
├── components/
│   ├── ErrorBoundary/   # Captura erros de renderização globais
│   ├── ErrorMessage/    # Mensagem de erro acessível
│   ├── Layout/          # Navbar + main wrapper
│   ├── RecentSearches/  # Lista de buscas recentes
│   ├── RepoCard/        # Card de repositório com link para detalhes
│   ├── RepoList/        # Lista de repos com sort, loading e estado vazio
│   ├── RepoSkeleton/    # Skeleton de carregamento do RepoCard
│   ├── SearchBar/       # Input de busca com submit
│   ├── SearchCard/      # Card visual da página de busca
│   ├── SortControl/     # Controle de ordenação (campo + direção)
│   └── UserCard/        # Perfil do usuário + UserCardSkeleton
├── pages/
│   ├── SearchPage/      # Busca inicial + histórico recente
│   ├── UserPage/        # Perfil do usuário + lista de repositórios
│   ├── RepoDetailPage/  # Detalhes de um repositório
│   └── NotFoundPage/
├── router/              # Configuração de rotas
├── services/
│   └── api.ts           # Instância Axios com interceptors (403/404)
├── store/
│   ├── githubApi.ts     # RTK Query — endpoints getUser, getUserRepos, getRepo
│   ├── historySlice.ts  # Slice Redux — histórico de buscas + localStorage
│   ├── hooks.ts         # useAppSelector / useAppDispatch tipados
│   └── index.ts         # configureStore
├── types/               # Interfaces TypeScript (GitHubUser, GitHubRepository)
└── utils/
    ├── date.ts          # Formatação de datas relativas (Intl.RelativeTimeFormat)
    ├── langColors.ts    # Mapa de cores por linguagem de programação
    └── sort.ts          # Comparadores de ordenação de repositórios
```

## Arquitetura

As páginas consomem dados exclusivamente via **RTK Query** (`useGetUserQuery`, `useGetUserReposQuery`, `useGetRepoQuery`). O RTK Query usa uma `axiosBaseQuery` customizada que delega os requests para a instância Axios em `services/api.ts`, onde os interceptors transformam erros 403 e 404 em mensagens legíveis antes de chegarem aos componentes.

O estado global de histórico de buscas vive no Redux (`historySlice`) e é sincronizado com `localStorage` a cada `addToHistory`.

## Segurança

O `index.html` inclui uma `Content-Security-Policy` que restringe conexões à própria origem e à API do GitHub, e imagens ao domínio `githubusercontent.com`.

## CI/CD

GitHub Actions executa lint, testes e build a cada push ou pull request para a branch `main`.

## Requisitos atendidos

### Técnicos
- ✅ React 19 com TypeScript
- ✅ Redux Toolkit (RTK Query + historySlice)
- ✅ Axios para consumo da API
- ✅ Rotas com React Router v7
- ✅ Testes com Jest e Testing Library (TDD)
- ✅ Layout responsivo com Bootstrap 5
- ✅ CI/CD com GitHub Actions

### Negócio
- ✅ Busca de usuário do GitHub
- ✅ Detalhes do usuário (seguidores, seguindo, avatar, e-mail e bio)
- ✅ Repositórios ordenados por estrelas (decrescente)
- ✅ Alteração da ordenação (estrelas, nome, atualização — crescente/decrescente)
- ✅ Página de detalhes do repositório com nome, descrição, estrelas, linguagem e link externo

### Bônus
- ✅ Aplicação hospedada no Vercel
- ✅ Content Security Policy (CSP)
- ✅ Cache de requisições via RTK Query

## APIs utilizadas

| Endpoint                      | Descrição                  |
| ----------------------------- | -------------------------- |
| `GET /users/{username}`       | Detalhes do usuário        |
| `GET /users/{username}/repos` | Repositórios do usuário    |
| `GET /repos/{full_name}`      | Detalhes de um repositório |
