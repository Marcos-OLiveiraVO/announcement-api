## Description

Esse é um template criado para ser o "padrão" de todo projeto back end pessoal - criado por Marcos - Oliveira, ele segue alguns conceitos de `Domain Drive Design` junto com `clean architecture`, possui uma CLI(em desenvolvimento), que permite a criação de forma automatizada de um modulo.

## Tecnologias Utilizadas

O projeto é construído com as seguintes tecnologias:

- Typescript
- Node.js
- Nestjs

## Estrutura de Pastas dos Módulos

```
└── NomeDoMódulo
    └── application
        └── entities
        └── useCases
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
        └── e2e
        └── inMemoryRepository
        └── unit
        └── mockData
```

## Pré-requisitos

- Para rodar o template é preciso ter o gerenciador de pacotes `yarn`
- Node.js versão >= 20.11.0

## Rodar os testes

Para rodar os testes automatizados execute o seguinte comando:

```bash
$ yarn test:unit
```

## Para rodar o projeto

Para rodar o projeto em ambiente local (dev) execute o seguinte comando:

```bash
$ yarn run start
```

## Contribuição

1. Clone o repositório.
2. Crie um novo branch a partir da branch de stage para sua funcionalidade ou correção de bug: `git checkout -b minha-funcionalidade`.
3. Implemente suas alterações e certifique-se de que o código esteja de acordo com os padrões de codificação do projeto.
4. Faça commit das suas alterações com mensagens de commit descritivas: `git commit -m 'Adicionar minha nova funcionalidade'`.
5. Envie suas alterações para o branch remoto: `git push origin minha-funcionalidade`.
6. Uma vez finalizada, faça o merge com a branch de `stage`.
7. De um `git push` para enviar para o repositório remoto.
8. Abra um pull request para develop, fornecendo uma descrição clara e concisa das alterações propostas.
