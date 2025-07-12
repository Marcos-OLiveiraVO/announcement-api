# 📢 Comunica.In Challenge API

## 📘 Descrição
Normalmente eu criaria a documentação em ingles para padronizar, mas para facilitar a leitura e o entendimento irei colocar em portugues.

Repositório referente ao desafio técnico da empresa **Comunica.In**.

A aplicação consiste em uma API RESTful com foco em gerenciamento de comunicados, integração resiliente com API externa, autenticação JWT, e arquitetura modular baseada em DDD e Clean Architecture. Todo o sistema pode ser executado localmente utilizando **Docker + Docker Compose**.

Cada funcionalidade foi cuidadosamente isolada em seu próprio módulo, promovendo escalabilidade e fácil manutenção. Além disso, toda regra de negócio foi validada por meio de testes unitários.

## ✅ Funcionalidades Implementadas

- API RESTful para comunicados
  - `GET /comunicados` com paginação e filtros **(Por status, tipo_canal, autor, período)**
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
- Logs estruturados e por níveis.
- Funções helpers.
- Testes unitarios.
- Pattern repository.
- Pattern dependency injection.
- CORS habilitado com lista de origens.

## 🚧 Diferenciais Implementados

- Integração com Docker e Docker Compose
- Retry automático com timeout + fallback
- Redis plugado via pattern repository
- Decorators customizados (como @Public - autenticação)
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

Para integrações ou serviços externos, gosto de utilizar a estruturação de shared:
```
└── src
      └── shared
        └── database
        └── infra
        └── middlewares
        └── services
        └── utils
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
##DB
DATABASE_URL="postgresql://admin:root@db:5432/announcement-db-dev"

##REDIS
REDIS_HOST=redis
REDIS_PORT=6379

##CORS
ALLOWED_ORIGINs=http://localhost:3000

##JWT
JWT_EXPIRATION_TIME=90000
JWT_SECRET='super_secret'
```

Essas credenciais devem bater com o `docker-compose.dev.yml`. O `.env.dev` está versionado para facilitar o teste da api(nesse caso especifico não tem problema).

### 3. Suba os containers

```bash
yarn dev
```

### 4. Rode as migrations

```bash
yarn db:migrate
```

## 📂 Documentação Swagger

Acesse `http://localhost:3000/api` para ver a documentação gerada automaticamente com Swagger.

[Screencast from 12-07-2025 03:42:49.webm](https://github.com/user-attachments/assets/051ce24a-b770-4f9a-bb59-b9a0a5bdaa7a)

## 📂 Autenticação
A api está protegida por autenticação necessitando de um token para acessar os endpoints privados.

Para facilitar os testes da api, criei um endpoint para gerar o token, com os dados já mockados (é claro que em produção e de acordo com o desenvolvimento o correto era ter o modulo de perfil, mas não é o objetivo aqui).

[Screencast from 12-07-2025 04:09:46.webm](https://github.com/user-attachments/assets/d16aeaa5-cd81-4ef4-8604-67627e86cb1b)


## ♻️ Health Check

A aplicação possui doi endpoint de health check em:

```http
GET /health/db
```

```http
GET /health/cache
```
[Screencast from 12-07-2025 03:48:48.webm](https://github.com/user-attachments/assets/54cfac9a-bdd4-4f22-84c8-2bbd49772ddb)

Ele verifica a conexão com PostgreSQL e Redis.

## 🔥 Integração Externa com Resiliência

A rota `GET /integracao/dados` consome a API do JSONPlaceholder e possui:

- Retry com 3 tentativas e backoff
- Timeout de 5s por tentativa
- Cache de 5 minutos
- Logs estruturados
- Fallback para dados cacheados em caso de falha

[Screencast from 12-07-2025 04:15:47.webm](https://github.com/user-attachments/assets/2e087470-3bef-4ae5-8558-139642734b39)


## 🧪 Testes

Foram implementados **testes unitários cobrindo todos os casos de uso e regras de negócio**. Não foi priorizado testes E2E ou integração por questões de prazo e foco no core da aplicação.

```bash
yarn test:unit
```

[Screencast from 12-07-2025 04:29:46.webm](https://github.com/user-attachments/assets/e3483828-dca6-44d5-a8ac-acbe9ed9f8ff)


## ⚙️ CLI para Módulos

Foi criada uma CLI personalizada para agilizar a criação de novos módulos com base na arquitetura da aplicação.

```bash
yarn module
```
[Screencast from 12-07-2025 03:51:59.webm](https://github.com/user-attachments/assets/9af14d6a-9dfb-484d-b5aa-ea93ebe2f68b)

## 📝 Decisões Técnicas

- **Class-validator** para validação
- **Prisma Middleware** implementando soft delete genérico
- **Redis** utilizado via abstraction de repositório
- **Arquitetura limpa e baseada em DDD**
- **Testes focados em regras de negócio**
- **Swagger** para documentação
- Organização por **branches** e **issues**
- Por simplicidade defini os tipos de canais(channelTypes) como enum - unico.
- Defini a data no dto no formato string, facilitando a validação em formato ISO(melhor visualização para quem está consumindo a api) e salvando no formato em date.
- Não realizei integração com filas(mensageria) por não ter necessidade.
- Criei o **tasks.md** com checklist de todas as coisas que foram pedidas e que foram atendidas.
- Optei pela api do JSONPlaceholder pela falta de necessidade de usar uma api key de integração e pela facilidade de integração.
- Implementei helper function para uso de fallback com logger.
- Implemntei helper function para uso de retry + backoff com logger.
- utilizei o repository pattern em cache e logger pela facilidade em trocar de plataforma no futuro.
- Não implementei refresh token para facilitar o uso de autenticação sem modulo de perfil.

## 📚 Planejamento

Todas as features foram mapeadas previamente em issues e implementadas com controle de versionamento por branches.

**Github issues**:
<img width="1366" height="768" alt="Screenshot from 2025-07-12 03-54-44" src="https://github.com/user-attachments/assets/8915d723-e40f-4aff-93fc-360a48b56ae9" />

**Branches**:
<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/052415c5-0618-4bc2-8359-4516a467ab3b" />


## 📩 Contato

**Autor**: [Marcos Oliveira](https://www.linkedin.com/in/marcos-oliveiraaa/)
