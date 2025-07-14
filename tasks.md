# Conteúdo da task list

markdown_content = """# ✅ Task List - Desafio Técnico Comunica.In

## 📅 Instruções Gerais

- [x] Prazo: 5 dias úteis
- [x] Entrega via repositório Git (GitHub, GitLab, etc.) para: kayo@comunica.in
- [x] Criar um README detalhado com:
  - [x] Instruções de instalação e execução
  - [x] Decisões técnicas tomadas
  - [x] Estrutura do projeto
  - [x] Como executar os testes
- [x] Stack sugerida: Node.js, PostgreSQL, Docker (opcional)

---

## 🟦 Seção 1: API de Comunicados (40 pontos)

### 🎯 Funcionalidades

- [x] Desenvolver uma API RESTful em Node.js com os seguintes endpoints:
  - [x] `GET /comunicados` - Lista comunicados com paginação e filtros
  - [x] `GET /comunicados/:id` - Retorna um comunicado específico
  - [x] `POST /comunicados` - Cria um novo comunicado
  - [x] `PUT /comunicados/:id` - Atualiza um comunicado
  - [x] `DELETE /comunicados/:id` - Soft delete de comunicado

### 🗃️ Modelo de Dados Sugerido

\`\`\`json
{
"id": "uuid",
"titulo": "string",
"conteudo": "string",
"tipo_canal": "email|slack|teams",
"status": "rascunho|enviado",
"data_criacao": "timestamp",
"data_envio": "timestamp",
"autor": "string",
"deletado_em": "timestamp"
}
\`\`\`

### 🛠️ Requisitos Técnicos

- [x] Banco de dados: PostgreSQL ou MySQL com migrations
- [x] Validação robusta: Joi, Yup ou similar
- [x] Paginação: limite, offset, total de registros
- [x] Filtros: por status, tipo_canal, autor, período
- [x] Soft delete (sem remoção física do banco)
- [x] Arquitetura limpa (separação entre controllers, services e repositories)
- [ ] Testes com cobertura mínima de 60%

### ⭐ Diferenciais

- [ ] Migrations automáticas
- [x] Seeders para dados de teste
- [x] Logs estruturados
- [x] Documentação da API com Swagger

---

## 🟧 Seção 2: Integração com Falhas e Retry (30 pontos)

### 🎯 Tarefa

- [x] Escolher uma API pública (ex: JSONPlaceholder, OpenWeatherMap)
- [x] Criar endpoint `GET /integracao/dados` que consome essa API
- [x] Implementar resiliência em caso de falhas

### 🛠️ Requisitos Técnicos

- [x] Retry logic com até 3 tentativas e backoff exponencial
- [x] Timeout de 5 segundos por tentativa
- [x] Cache dos dados por 5 minutos (Redis ou memória)
- [x] Logs de tentativas, sucessos e falhas
- [x] Tratamento de erro estruturado se a API falhar
- [x] Fallback: usar dados do cache quando a API estiver indisponível

### ⭐ Diferenciais

- [-] Implementar Circuit Breaker Pattern
- [-] Métricas de performance da integração
- [-] Queue para processamento assíncrono
- [-] Webhook para notificações de falha

---

## 🟥 Seção 3: Arquitetura e Produção (30 pontos)

### 🛠️ Requisitos Obrigatórios

- [x] Autenticação JWT com middleware de proteção
- [x] Middleware de validação em todas as rotas
- [x] Tratamento centralizado de erros com códigos HTTP adequados
- [x] CORS configurado para produção
- [x] Uso de variáveis de ambiente
- [x] Health check em `GET /health` com status do banco
- [x] Execução de migrations do banco de dados
- [x] Estrutura de projeto organizada e escalável

### ⭐ Diferenciais

- [x] Rate limiting
- [x] Logging estruturado com níveis
- [x] Docker/docker-compose para desenvolvimento
- [-] Middleware de compressão e otimizações
- [-] JWT com refresh tokens
- [ ] Monitoramento básico com métricas

---

## 📊 Critérios de Avaliação

### 🧱 Arquitetura e Qualidade (40%)

- [x] Código limpo e escalável
- [x] Separação de responsabilidades
- [x] Aplicação de padrões de projeto
- [x] Configuração voltada para produção

### 🧪 Testes e Robustez (30%)

- [ ] Cobertura de testes ≥ 60%
- [x] Tratamento de erros e casos extremos
- [x] Mecanismos de resiliência implementados
- [x] Logs e monitoramento básico

### 🚀 Funcionalidade (30%)

- [x] Endpoints funcionando corretamente
- [x] Validações e integrações implementadas
- [x] Features completas e bem acabadas
- [x] Performance adequada

---

## 📦 Entregáveis

- [x] Código-fonte completo no repositório Git
- [x] README com:
  - [x] Instruções de instalação e execução
  - [x] Decisões arquiteturais
  - [x] Como executar os testes
  - [x] Estrutura do projeto
  - [x] Migrations do banco de dados
- [x] Collection do Postman ou exemplos de uso da API
- [x] Dockerfile (se implementado)
