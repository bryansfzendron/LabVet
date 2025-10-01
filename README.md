# LabVet - Sistema de Laboratório Veterinário

Sistema moderno de gestão para laboratórios veterinários, desenvolvido com arquitetura moderna e escalável.

## 🏗️ Arquitetura

### Backend (Node.js + TypeScript)
- **Framework**: Express.js com TypeScript
- **Banco de Dados**: SQL Server com Prisma ORM
- **Autenticação**: JWT com bcrypt
- **Validação**: Zod
- **Documentação**: Swagger/OpenAPI
- **Logs**: Winston
- **Testes**: Jest

### Frontend (React + TypeScript)
- **Framework**: React 18 com TypeScript
- **Build Tool**: Vite
- **Roteamento**: React Router v6
- **Estado**: Zustand
- **UI**: Tailwind CSS + Lucide Icons
- **Formulários**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Notificações**: React Hot Toast

## 📋 Pré-requisitos

### Software Necessário
1. **Node.js** (versão 18 ou superior)
   - Download: https://nodejs.org/
   - Verificar instalação: `node --version`

2. **SQL Server** (LocalDB ou Express)
   - SQL Server Express: https://www.microsoft.com/sql-server/sql-server-downloads
   - Ou SQL Server LocalDB

3. **Git** (para versionamento)
   - Download: https://git-scm.com/

### Configuração do Ambiente

#### 1. Instalar Node.js
```bash
# Verificar se o Node.js está instalado
node --version
npm --version

# Se não estiver instalado, baixe de: https://nodejs.org/
```

#### 2. Configurar SQL Server
```sql
-- Criar banco de dados
CREATE DATABASE LabVetDB;
```

## 🚀 Instalação e Configuração

### 1. Clonar o Repositório
```bash
git clone <url-do-repositorio>
cd LabVet-Refatorado
```

### 2. Configurar Backend
```bash
cd backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Editar .env com suas configurações
# DATABASE_URL="sqlserver://localhost:1433;database=LabVetDB;integratedSecurity=true"
# JWT_SECRET="seu-jwt-secret-aqui"
# PORT=3001

# Executar migrações do banco
npx prisma migrate dev

# Gerar cliente Prisma
npx prisma generate

# Executar seeds (dados iniciais)
npx prisma db seed
```

### 3. Configurar Frontend
```bash
cd ../frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Editar .env se necessário
# VITE_API_URL=http://localhost:3001
```

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Produção
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 📁 Estrutura do Projeto

```
LabVet-Refatorado/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── services/        # Lógica de negócio
│   │   ├── models/          # Modelos Prisma
│   │   ├── routes/          # Rotas da API
│   │   ├── middleware/      # Middlewares
│   │   ├── utils/           # Utilitários
│   │   └── config/          # Configurações
│   ├── prisma/              # Schema do banco
│   ├── tests/               # Testes
│   └── package.json
├── frontend/                # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── services/        # Serviços API
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utilitários
│   │   └── types/           # Tipos TypeScript
│   ├── public/              # Arquivos estáticos
│   └── package.json
├── mobile/                  # App React Native (futuro)
├── database/                # Scripts e migrações
├── docs/                    # Documentação
└── docker-compose.yml       # Orquestração de containers
```

## 🚀 Módulos do Sistema

### 📝 Cadastros
- **Clientes** - Gestão de clínicas e proprietários
- **Animais** - Registro de pacientes
- **Profissionais** - Veterinários e técnicos
- **Exames** - Parâmetros e tipos de exames
- **Espécies** - Classificação animal

### 🔄 Movimentos
- **Pedidos** - Solicitações de exames
- **Coletas** - Registro de amostras
- **Resultados** - Entrada de dados laboratoriais
- **Laudos** - Geração e liberação de relatórios

### 💰 Financeiro
- **Faturamento** - Cobrança de serviços
- **Contas a Pagar/Receber** - Gestão financeira
- **Descontos** - Políticas de desconto
- **Relatórios Financeiros** - Análises e extratos

### 🔧 Integrações
- **FTP Server** - Recepção de dados de equipamentos
- **API REST** - Integração com sistemas externos
- **Backup Automático** - Rotinas de segurança

## 🔐 Segurança

- **Autenticação JWT** - Tokens seguros
- **Criptografia bcrypt** - Senhas protegidas
- **CORS configurado** - Controle de acesso
- **Rate Limiting** - Proteção contra ataques
- **Validação de dados** - Sanitização de entrada

## 📊 Performance

- **Cache Redis** - Dados frequentes em memória
- **Paginação** - Listagens otimizadas
- **Índices PostgreSQL** - Consultas rápidas
- **Compressão gzip** - Transferência otimizada

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+
- PostgreSQL 16
- Redis (opcional)
- Git

### Instalação
```bash
# Clone o repositório
git clone <url-do-repo>
cd LabVet-Refatorado

# Backend
cd backend
npm install
npx prisma migrate dev
npm run dev

# Frontend (novo terminal)
cd ../frontend
npm install
npm run dev
```

## 📈 Roadmap

- [x] Estrutura base do projeto
- [ ] API Backend completa
- [ ] Frontend React
- [ ] Migração de dados
- [ ] Testes automatizados
- [ ] Deploy em produção
- [ ] App mobile React Native

## 🤝 Contribuição

Este projeto segue as melhores práticas de desenvolvimento:
- Commits semânticos
- Code review obrigatório
- Testes automatizados
- Documentação atualizada

---

**Migrado de:** Sistema Delphi legado com BDE  
**Para:** Arquitetura moderna Node.js + React + PostgreSQL  
**Objetivo:** Escalabilidade, manutenibilidade e performance# LabVet
