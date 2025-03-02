# API de Gestão de Viagens (RESTful)

## 🎯 Objetivo

A API de Gestão de Viagens tem como objetivo permitir que os usuários:

- Cadastrem viagens
- Adicionem passageiros
- Registrem roteiros e destinos
- Gerenciem reservas
- Acompanhem o status de viagens

## 🏗️ Tecnologias Utilizadas

A API foi desenvolvida utilizando as seguintes tecnologias:

- **Node.js** com **Fastify**
- **TypeScript**
- **PostgreSQL** para persistência de dados
- **Prisma ORM** para manipulação do banco de dados
- **Docker** para containerização
- **JWT** para autenticação

## 📌 Funcionalidades da API

### 🔐 Autenticação de Usuários

- Registro de usuários
- Login com geração de token JWT

### ✈️ Gerenciamento de Viagens

- Cadastro de viagens
- Edição de viagens
- Exclusão de viagens

### 🧑‍🤝‍🧑 Cadastro de Passageiros

- Relacionamento entre passageiros e viagens
- Listagem de passageiros vinculados a uma viagem

### 📍 Gerenciamento de Roteiros

- Cadastro de destinos
- Definição de itinerários dentro de uma viagem

### 🎫 Gestão de Reservas

- Associação entre usuários e viagens
- Controle de status de reservas

### 📊 Monitoramento de Status das Viagens

- Acompanhamento do status da viagem em tempo real

## 🚀 Como Executar o Projeto

### 📌 Requisitos

Antes de iniciar, certifique-se de ter instalado:

- **Node.js** (versão mais recente recomendada)
- **Docker** e **Docker Compose**

### 📥 Instalação e Configuração

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/api-gestao-viagens.git
   ```
2. Acesse o diretório do projeto:
   ```sh
   cd api-gestao-viagens
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto e defina as variáveis conforme o exemplo no arquivo `.env.example`.

### 🐳 Executando com Docker

1. Inicie os containers com PostgreSQL e a API:
   ```sh
   docker-compose up -d
   ```
2. A API estará disponível em `http://localhost:3000`.

### ▶️ Executando sem Docker

1. Inicie o banco de dados PostgreSQL manualmente.
2. Execute as migrações do banco de dados:
   ```sh
   npx prisma migrate dev
   ```
3. Inicie a API:
   ```sh
   npm run dev
   ```

## 📡 Endpoints Principais

### 🛠 Autenticação

- **POST** `/auth/register` → Cadastro de usuário
- **POST** `/auth/login` → Autenticação e geração de token JWT

### 🚀 Viagens

- **GET** `/trips` → Listar todas as viagens
- **POST** `/trips` → Criar uma nova viagem
- **GET** `/trips/:id` → Obter detalhes de uma viagem
- **PUT** `/trips/:id` → Atualizar informações da viagem
- **DELETE** `/trips/:id` → Remover uma viagem

### 👥 Passageiros

- **POST** `/trips/:id/passengers` → Adicionar passageiro à viagem
- **GET** `/trips/:id/passengers` → Listar passageiros da viagem

### 📍 Roteiros

- **POST** `/trips/:id/itinerary` → Criar um itinerário para a viagem
- **GET** `/trips/:id/itinerary` → Listar itinerário da viagem

### 🎫 Reservas

- **POST** `/trips/:id/reservations` → Criar uma reserva para um usuário
- **GET** `/trips/:id/reservations` → Listar reservas da viagem

### 📊 Status

- **GET** `/trips/:id/status` → Verificar status da viagem

## 📝 Contribuição

Sinta-se à vontade para contribuir! Para isso:

1. Fork este repositório
2. Crie uma branch com sua feature: `git checkout -b minha-feature`
3. Commit suas mudanças: `git commit -m 'Adicionando minha feature'`
4. Faça um push para sua branch: `git push origin minha-feature`
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Para mais detalhes, consulte o arquivo `LICENSE`.

---

💡 Desenvolvido com ❤️ e Fastify!

