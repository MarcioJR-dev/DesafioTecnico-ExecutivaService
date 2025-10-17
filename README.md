# 🏛️ EXECUTIVA SERVICE

**SAUDAÇÕES tech recruiter! 👋**

Bem-vindo ao **EXECUTIVA SERVICE** - uma aplicação web profissional de gerenciamento de tarefas desenvolvida especificamente para escritórios de advocacia. Este projeto demonstra habilidades em desenvolvimento full-stack com foco em design elegante, segurança e experiência do usuário.

## 🎯 Sobre o Projeto

O **EXECUTIVA SERVICE** é uma plataforma de gestão de tarefas que simula os serviços de uma secretária jurídica remota. A aplicação oferece uma interface elegante e profissional, perfeita para o ambiente corporativo jurídico, com design minimalista em preto, branco e detalhes dourados.

### 🎨 Design Philosophy
- **Elegância Profissional**: Design limpo e sofisticado adequado para advocacia
- **Tipografia Formal**: Uso de fontes serifadas (Crimson Text + Playfair Display)
- **Paleta Corporativa**: Preto, branco e detalhes dourados
- **UX Intuitiva**: Interface responsiva e acessível

## 🚀 Tecnologias Utilizadas

### Backend (Node.js + TypeScript)
- **Node.js** v18+ - Runtime JavaScript
- **Express.js** v5.1.0 - Framework web
- **TypeScript** v5.9.3 - Tipagem estática
- **Prisma** v6.17.1 - ORM moderno e type-safe
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação stateless
- **bcrypt** - Criptografia de senhas
- **CORS** - Configuração de políticas de origem

### Frontend (React + TypeScript)
- **React** v19.1.1 - Biblioteca de interface
- **TypeScript** v5.9.3 - Tipagem estática
- **Vite** v7.1.7 - Build tool moderna
- **Tailwind CSS** v4.1.14 - Framework CSS utility-first
- **React Router** v7.9.4 - Roteamento SPA
- **Axios** v1.12.2 - Cliente HTTP
- **Google Fonts** - Tipografia profissional

### DevOps & Deploy
- **Railway** - Deploy do backend (PostgreSQL + Node.js)
- **Vercel** - Deploy do frontend (React)
- **GitHub** - Controle de versão

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (versão 12 ou superior)
- **Git**

## 🛠️ Como Executar o Projeto

### 1. Clone o Repositório
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
cp env.example .env
```

**Configure o arquivo `.env` com suas credenciais:**
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/executivaservice"
JWT_SECRET="sua-chave-secreta-super-segura-aqui"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

**Criar o banco de dados:**
```sql
-- Execute no PostgreSQL
CREATE DATABASE executivaservice;
```

**Executar migrations do Prisma:**
```bash
# Gerar o Prisma Client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Iniciar o servidor
npm run dev
```

✅ **Backend rodando em:** `http://localhost:3001`

### 3. Configuração do Frontend

```bash
# Abrir novo terminal na pasta raiz
cd frontend

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

✅ **Frontend rodando em:** `http://localhost:5173`

## 📁 Estrutura do Projeto

```
EXECUTIVA SERVICE/
├── 📁 backend/                    # API Node.js + TypeScript
│   ├── 📁 prisma/                # Schema e migrations
│   │   ├── schema.prisma         # Modelos de dados
│   │   └── migrations/           # Histórico de mudanças do DB
│   ├── 📁 src/
│   │   ├── 📁 controllers/       # Lógica de negócio
│   │   ├── 📁 middlewares/       # Autenticação, logs, erros
│   │   ├── 📁 routes/           # Definição de rotas
│   │   ├── 📁 config/           # Configurações (CORS, etc)
│   │   ├── 📁 utils/            # Utilitários e validações
│   │   └── server.ts            # Servidor principal
│   └── package.json
│
├── 📁 frontend/                   # React + TypeScript
│   ├── 📁 src/
│   │   ├── 📁 components/        # Componentes reutilizáveis
│   │   │   ├── ConfirmModal.tsx  # Modal de confirmação elegante
│   │   │   ├── Toast.tsx         # Notificações personalizadas
│   │   │   ├── Navbar.tsx        # Barra de navegação
│   │   │   └── ...
│   │   ├── 📁 pages/            # Páginas da aplicação
│   │   ├── 📁 hooks/            # Custom hooks (useToast, useConfirmModal)
│   │   ├── 📁 services/         # Comunicação com API
│   │   ├── 📁 context/          # Context API (AuthContext)
│   │   └── 📁 types/            # Definições TypeScript
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### 🔐 Autenticação

| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| `POST` | `/api/auth/signup` | Cadastrar usuário | `{ nome, email, password }` |
| `POST` | `/api/auth/signin` | Login | `{ email, password }` |

### 📝 Tarefas (Requerem JWT)

| Método | Endpoint | Descrição | Headers |
|--------|----------|-----------|---------|
| `GET` | `/api/tasks` | Listar tarefas | `Authorization: Bearer {token}` |
| `POST` | `/api/tasks` | Criar tarefa | `Authorization: Bearer {token}` |
| `GET` | `/api/tasks/:id` | Buscar tarefa | `Authorization: Bearer {token}` |
| `PUT` | `/api/tasks/:id` | Atualizar tarefa | `Authorization: Bearer {token}` |
| `DELETE` | `/api/tasks/:id` | Excluir tarefa | `Authorization: Bearer {token}` |

### 🏥 Health Check
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/health` | Status do servidor |

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- ✅ **Cadastro seguro** com validações
- ✅ **Login com JWT** e expiração de token
- ✅ **Proteção de rotas** no backend e frontend
- ✅ **Criptografia de senhas** com bcrypt
- ✅ **Logout seguro**

### 📋 Gerenciamento de Tarefas
- ✅ **CRUD completo** de tarefas
- ✅ **Organização por status** (Pendente, Em Andamento, Concluída)
- ✅ **Interface drag-and-drop** visual
- ✅ **Validações em tempo real**
- ✅ **Histórico de datas** (criação e conclusão)

### 🎨 Interface e UX
- ✅ **Design responsivo** (mobile-first)
- ✅ **Tipografia profissional** (serifadas)
- ✅ **Sistema de toast** personalizado
- ✅ **Modal de confirmação** elegante
- ✅ **Loading states** e feedback visual
- ✅ **Animações suaves** e transições

### 🛡️ Segurança e Qualidade
- ✅ **Validações de entrada** robustas
- ✅ **Tratamento de erros** com códigos HTTP
- ✅ **CORS configurado** para produção
- ✅ **TypeScript** em todo o projeto
- ✅ **Padrões de commit** semânticos

## 🚀 Deploy em Produção

### Backend (Railway)
- **URL:** `https://desafiotecnico-executivaservice-production.up.railway.app`
- **Banco:** PostgreSQL gerenciado pelo Railway
- **Variáveis de ambiente** configuradas no dashboard

### Frontend (Vercel)
- **URL:** `https://desafio-tecnico-executiva-service.vercel.app`
- **Deploy automático** via GitHub
- **Configuração de roteamento** para SPA

## 🧪 Como Testar

1. **Acesse:** `http://localhost:5173`
2. **Cadastre-se** com seus dados
3. **Faça login** na aplicação
4. **Explore o dashboard** e crie algumas tarefas
5. **Teste as funcionalidades:**
   - Criar/editar/excluir tarefas
   - Alterar status das tarefas
   - Modal de confirmação
   - Sistema de notificações

## 📊 Stack de Desenvolvimento

### 🔧 Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação automática
- **TypeScript** - Tipagem estática
- **Git** - Controle de versão

### 📦 Gerenciamento de Dependências
- **npm** - Package manager
- **package-lock.json** - Lock de versões

### 🗄️ Banco de Dados
- **PostgreSQL** - Banco relacional robusto
- **Prisma** - ORM moderno com type-safety
- **Migrations** - Versionamento do schema

## 🎯 Diferenciais Técnicos

### 🏗️ Arquitetura
- **Separação clara** entre backend e frontend
- **Padrão MVC** no backend
- **Componentização** no frontend
- **Custom hooks** para lógica reutilizável

### 🔒 Segurança
- **JWT** para autenticação stateless
- **bcrypt** para hash de senhas
- **Validações** em todas as entradas
- **CORS** configurado adequadamente

### 🎨 Design System
- **Design tokens** consistentes
- **Componentes reutilizáveis**
- **Sistema de cores** corporativo
- **Tipografia** profissional

## 📝 Padrões de Commit

Este projeto segue **Conventional Commits**:

```
feat: adicionar nova funcionalidade
fix: corrigir bug
docs: atualizar documentação
style: ajustes de formatação
refactor: refatoração de código
test: adicionar testes
chore: tarefas de manutenção
```

## 👨‍💻 Desenvolvedor

**Márcio Junior**  
*Full Stack Developer*

- 🎯 **Foco:** Desenvolvimento web moderno
- 🛠️ **Stack:** Node.js, React, TypeScript, PostgreSQL
- 🎨 **Design:** Interfaces elegantes e funcionais
- 🔒 **Segurança:** Boas práticas de desenvolvimento seguro

## 📄 Licença

Este projeto foi desenvolvido como parte de um **desafio técnico** para demonstração de habilidades em desenvolvimento full-stack.

---

**Obrigado pela oportunidade de apresentar este projeto! 🚀**

*Para dúvidas ou sugestões, sinta-se à vontade para entrar em contato.*