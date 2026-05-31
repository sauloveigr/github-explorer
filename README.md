# GitHub Explorer

Aplicação client-side que consome a API do GitHub e exibe os repositórios mais populares de um usuário.

<img width="1920" height="999" alt="image" src="https://github.com/user-attachments/assets/fcff69e0-6184-4e7c-97b2-df1ec3a222aa" />


## Demo

🔗 [Link da aplicação](https://SEU-LINK-AQUI)

## Tecnologias

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Bootstrap 5](https://getbootstrap.com/)

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
├── components/     # Componentes reutilizáveis
├── hooks/          # Custom hooks (useUser, useRepositories)
├── pages/          # Páginas da aplicação
├── router/         # Configuração de rotas
├── services/       # Integração com a API do GitHub
├── types/          # Tipagens TypeScript
└── utils/          # Funções utilitárias
```

## APIs utilizadas

| Endpoint                      | Descrição                  |
| ----------------------------- | -------------------------- |
| `GET /users/{username}`       | Detalhes do usuário        |
| `GET /users/{username}/repos` | Repositórios do usuário    |
| `GET /repos/{full_name}`      | Detalhes de um repositório |
