# Node.js + PostgreSQL CRUD API

Este projeto implementa uma API RESTful usando Node.js, Express e PostgreSQL para gerenciar um CRUD (Create, Read, Update, Delete) de escolas.

## 🚀 Tecnologias Utilizadas
- Node.js
- Express
- PostgreSQL
- pg (biblioteca para conexão com o banco de dados PostgreSQL)
- Docker (opcional para rodar o PostgreSQL)

---

## 📌 Pré-requisitos
Antes de rodar o projeto, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (opcional, mas recomendado para rodar o banco de dados facilmente)

---

## 🔧 Configuração do Banco de Dados
Crie um banco de dados no PostgreSQL e configure a conexão no arquivo `db.js`:

```javascript
const { Pool } = require('pg');

const pool = new Pool({
    user: 'seu_usuario',
    host: 'localhost',
    database: 'seu_banco',
    password: 'sua_senha',
    port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
```

Se estiver usando Docker, execute o seguinte comando para rodar o PostgreSQL em um container:

```sh
docker run --name postgres-db -e POSTGRES_USER=seu_usuario -e POSTGRES_PASSWORD=sua_senha -e POSTGRES_DB=seu_banco -p 5432:5432 -d postgres
```

---

## 📜 Rotas Disponíveis

### Criar a tabela `schools` (caso ainda não exista)
```http
GET /setup
```

### Obter todas as escolas
```http
GET /
```
#### Resposta:
```json
{
  "children": [
    { "id": 1, "name": "Escola A", "location": "Cidade X" },
    { "id": 2, "name": "Escola B", "location": "Cidade Y" }
  ]
}
```

### Adicionar uma nova escola
```http
POST /
```
#### Body:
```json
{
  "name": "Escola Nova",
  "location": "Cidade Z"
}
```

### Atualizar uma escola pelo ID
```http
PUT /:id
```
#### Body:
```json
{
  "name": "Novo Nome",
  "location": "Nova Cidade"
}
```

### Deletar uma escola pelo ID
```http
DELETE /:id
```

---

## ▶️ Executando o Projeto
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor:
   ```sh
   node server.js
   ```
3. Acesse `http://localhost:3000` e utilize um cliente HTTP (Postman, Insomnia) para testar as rotas.

---

## 🛠 Possíveis Melhorias
- Implementar autenticação (JWT)
- Criar uma interface frontend
- Melhorar a validação dos dados com Joi ou Express Validator
- Adicionar paginação na listagem de escolas

Contribuições são bem-vindas! 🎉

