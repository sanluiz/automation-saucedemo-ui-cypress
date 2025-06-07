POC - Automação de Testes com Cypress

---

# Objetivo

Automatizar o fluxo de compra no site https://www.saucedemo.com utilizando Cypress com JavaScript e arquitetura Page Object Model (POM).

---

# Setup do Projeto

1. Clone o repositório:

git clone https://github.com/sanluiz/automation-saucedemo-ui-cypress

2. Entre na pasta do projeto:

cd automation-saucedemo-ui-cypress

3. Instale as dependências:

npm install

---

# Como Rodar os Testes

- Abrir a interface do Cypress

npm run cypress

- Ou rodar em modo headless

npm test

---

# Scripts Úteis

- Rodar ESLint para verificar o código:

npm run lint

- Rodar ESLint e corrigir automaticamente o que for possível:

npm run lint:fix

- Rodar Prettier para formatar os arquivos automaticamente:

npm run format

---

# Estrutura do Projeto

- cypress/e2e/ - testes organizados por fluxo/página
- cypress/pages/ - objetos de página (Page Object Model)
- cypress/support/ - comandos customizados e suporte geral
- eslint.config.js - configuração do ESLint
- package.json - gerenciamento de dependências e scripts
- prettier.config.js ou .prettierrc - configuração do Prettier
