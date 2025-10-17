# Task Manager - Sistema de Gerenciamento de Tarefas

Sistema full stack de gerenciamento de tarefas com autenticação JWT, desenvolvido com Node.js/Express no backend e React/TypeScript no frontend.

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/MarcioJR-dev/DesafioTecnico-ExecutivaService.git
cd DesafioTecnico-ExecutivaService
```

### 2. Configuração do Backend

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Copie o arquivo .env.example e renomeie para .env
# Edite o arquivo .env com suas configurações do PostgreSQL

# Exemplo de configuração no .env:
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/taskmanager"
# JWT_SECRET="sua-chave-secreta-aqui"
# PORT=3001

# Criar o banco de dados no PostgreSQL
# Execute no psql ou pgAdmin:
# CREATE DATABASE taskmanager;

# Executar migrations do Prisma
npm run prisma:migrate

# Gerar o Prisma Client
npm run prisma:generate

# Iniciar o servidor de desenvolvimento
npm run dev
```

O backend estará rodando em `http://localhost:3001`

### 3. Configuração do Frontend

Abra um novo terminal:

```bash
# Entrar na pasta do frontend
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
EXECUTIVASERVICE/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── AuthController.ts
│   │   │   └── TaskController.ts
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorHandler.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   └── taskRoutes.ts
│   │   ├── utils/
│   │   │   └── prisma.ts
│   │   └── server.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── PrivateRoute.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TaskForm.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── DashboardPage.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── taskService.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

## 🔌 Endpoints da API

### Autenticação

#### POST `/api/auth/signup`
Cadastrar novo usuário

**Body:**
```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123"
}
```

#### POST `/api/auth/signin`
Fazer login

**Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "token": "jwt_token_aqui",
  "user": {
    "id": "uuid",
    "email": "usuario@email.com",
    "nome": "Nome do Usuário"
  }
}
```

### Tarefas (Rotas Protegidas - Requerem Token JWT)

Adicione o header em todas as requisições de tarefas:
```
Authorization: Bearer {seu_token_jwt}
```

#### GET `/api/tasks`
Listar todas as tarefas do usuário

#### POST `/api/tasks`
Criar nova tarefa

**Body:**
```json
{
  "titulo": "Título da tarefa",
  "descricao": "Descrição detalhada",
  "status": "PENDENTE"
}
```

Status possíveis: `PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDA`

#### GET `/api/tasks/:id`
Buscar tarefa por ID

#### PUT `/api/tasks/:id`
Atualizar tarefa

**Body:**
```json
{
  "titulo": "Novo título",
  "descricao": "Nova descrição",
  "status": "CONCLUIDA",
  "dataConclusao": "2025-10-17T12:00:00Z"
}
```

#### DELETE `/api/tasks/:id`
Excluir tarefa

## 🎨 Funcionalidades

### Autenticação
- ✅ Cadastro de usuário com validações
- ✅ Login com JWT
- ✅ Proteção de rotas
- ✅ Logout

### Gerenciamento de Tarefas
- ✅ Criar tarefa
- ✅ Listar tarefas (organizadas por status)
- ✅ Editar tarefa
- ✅ Excluir tarefa
- ✅ Alterar status da tarefa
- ✅ Visualização em colunas (Pendente, Em Andamento, Concluída)

### Segurança
- ✅ Senhas criptografadas com bcrypt
- ✅ Tokens JWT com expiração
- ✅ Validações de entrada
- ✅ Tratamento de erros com códigos HTTP apropriados
- ✅ Proteção de rotas no backend e frontend

## 🛠️ Scripts Disponíveis

### Backend
```bash
npm run dev          # Inicia servidor em modo desenvolvimento
npm run build        # Compila TypeScript para JavaScript
npm start            # Inicia servidor em produção
npm run prisma:migrate  # Executa migrations do Prisma
npm run prisma:generate # Gera Prisma Client
```

### Frontend
```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Cria build de produção
npm run preview      # Preview do build de produção
```

## 🧪 Testando a Aplicação

1. Acesse `http://localhost:5173` no navegador
2. Crie uma nova conta na tela de cadastro
3. Faça login com suas credenciais
4. Gerencie suas tarefas no dashboard

## 📝 Padrões de Commit

Este projeto segue o padrão de commits semânticos:

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `chore`: Tarefas de manutenção
- `refactor`: Refatoração de código
- `docs`: Documentação
- `style`: Formatação
- `test`: Testes

## 👨‍💻 Desenvolvedor

Márcio Junior

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.

