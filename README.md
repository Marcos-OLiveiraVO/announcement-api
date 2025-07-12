# 📢 Comunica.In Challenge API

## 📘 Descrição

Repositório referente ao desafio técnico da empresa **Comunica.In**.

A aplicação consiste em uma API RESTful com foco em gerenciamento de comunicados, integração resiliente com API externa, autenticação JWT, e arquitetura modular baseada em DDD e Clean Architecture. Todo o sistema pode ser executado localmente utilizando **Docker + Docker Compose**.

Cada funcionalidade foi cuidadosamente isolada em seu próprio módulo, promovendo escalabilidade e fácil manutenção. Além disso, toda regra de negócio foi validada por meio de testes unitários.

## ✅ Funcionalidades Implementadas

- API RESTful para comunicados
  - `GET /comunicados` com paginação e filtros
  - `GET /comunicados/:id`
  - `POST /comunicados`
  - `PUT /comunicados/:id`
  - `DELETE /comunicados/:id` (soft delete)
- Integração resiliente com API externa (JSONPlaceholder)
  - Retry com backoff exponencial
  - Cache em memória (Redis)
  - Fallback com dados cacheados
- Autenticação via JWT
- Middleware global de validação
- Middleware global de tratamento de erros
- Health Check (`/health`) verificando DB e Redis
- Documentação com Swagger
- Estrutura modular e limpa
- CLI interna para criação de módulos
- Variáveis de ambiente organizadas
- Logs estruturados

## 🚧 Diferenciais Implementados

- Integração com Docker e Docker Compose
- Retry automático com timeout + fallback
- Redis plugado via pattern repository
- Decorators customizados (como @Public)
- Prisma Middleware para soft delete genérico
- CLI para criação automatizada de módulos
- Organização das tasks em branches e issues

## 🧱 Arquitetura

O projeto foi construído com base em **DDD** e **Arquitetura Limpa**, respeitando os princípios de separação de responsabilidade, inversão de dependência e isolando regras de negócio do mundo externo.

```
└── comunicados
    └── application
        └── entities
        └── use-cases
        └── interfaces
    └── infra
        └── database
            └── repositories
        └── http
            └── controllers
            └── viewModels
        └── adapters
            └── dtos
            └── mappers
    └── tests
        └── inMemoryRepository
        └── unit
        └── mockData
```

## 🧪 Testes

Foram implementados **testes unitários cobrindo todos os casos de uso e regras de negócio**. Não foi priorizado testes E2E ou integração por questões de prazo e foco no core da aplicação.

```bash
yarn test:unit
```

## 🐳 Setup do Projeto

Pré-requisitos:

- Node.js (v22.14.0)
- Yarn (v1.22.22)
- Docker e Docker Compose

### 1. Instale as dependências

```bash
yarn
```

### 2. Configure o banco de dados

Crie os arquivos `.env` e `.env.dev` com a seguinte variável:

```env
DATABASE_URL="postgresql://postgres:user@db:senha/comunica-in"
```

Essas credenciais devem bater com o `docker-compose.dev.yml`. O `.env.dev` está versionado por segurança do setup.

### 3. Suba os containers

```bash
yarn dev
```

### 4. Rode as migrations

```bash
yarn db:migrate
```

## 📂 Documentação Swagger

Acesse `http://localhost:5000/api` para ver a documentação gerada automaticamente com Swagger.

## ♻️ Health Check

A aplicação possui um endpoint de health check em:

```http
GET /health
```

Ele verifica a conexão com PostgreSQL e Redis.

## 🔥 Integração Externa com Resiliência

A rota `GET /integracao/dados` consome a API do JSONPlaceholder e possui:

- Retry com 3 tentativas e backoff
- Timeout de 5s por tentativa
- Cache de 5 minutos
- Logs estruturados
- Fallback para dados cacheados em caso de falha

## ⚙️ CLI para Módulos

Foi criada uma CLI personalizada para agilizar a criação de novos módulos com base na arquitetura da aplicação.

```bash
yarn cli:make-module nome-do-modulo
```

## 📝 Decisões Técnicas

- **Class-validator** para validação
- **Prisma Middleware** implementando soft delete genérico
- **Redis** utilizado via abstraction de repositório
- **Arquitetura limpa e baseada em DDD**
- **Testes focados em regras de negócio**
- Swagger para documentação
- Organização por branches e issues

## 📚 Planejamento

Todas as features foram mapeadas previamente em issues e implementadas com controle de versionamento por branches.

## 📩 Contato

**Autor**: [Marcos Oliveira](https://www.linkedin.com/in/marcos-oliveiraaa/)
