# 📅 Back-End Node.js + Express + JWT (Startup Events)
[![github](https://img.shields.io/badge/github-%40frankkol-grey?style=for-the-badge&logo=github)](https://github.com/frankkol)
[![linkedin](https://img.shields.io/badge/linkedin-%40frankkol-blue?style=for-the-badge)](https://linkedin.com/in/frankkol)

## Este back-end tem como objetivo permitir ao usuário a criação e gerenciamento(atualização e deleção) de eventos de forma estruturada e intuitiva.

- Criação de usuarios;
- Autenticação de usuario;
- Atualização do usuario;
- Criação de um novo evento;
- Alteração do evento existente;
- Remoção de um evento existente;
- Listagem de eventos por usuario;

## Tecnologias
 - [Node.js](https://nodejs.org)
 - [Express](https://expressjs.com)
 - [JWT](https://jwt.io)
 - [Swagger](https://swagger.io)

## 📸 Tela do Swagger
<img width="1311" height="929" alt="swagger" src="https://github.com/user-attachments/assets/7ef42722-5fe2-4335-a1d5-6301c1ea0213" />

## >_ Inicialização da applicação
Para iniciar o servidor local, execute o comando abaixo:

```bash
npm run start
```

```http
 $ npm run start

> startup-events@1.0.0 start
> node ./app.js

[dotenv@17.2.3] injecting env (3) from .env -- tip: ⚙️  write to custom object with { processEnv: myObject }
🚀 Server running on port 5000
✅ MongoDB connected (Mongoose)
```

## 🌐 API

#### Retorna os dados do usuario

```http
  GET /api/users/user
```
```json
{
    "_id": "6942c4e46247901aca0378f5",
    "name": "Frank Rodrigues Oliveira",
    "email": "frank@test.com",
    "createdAt": "2025-12-17T14:57:40.912Z",
    "updatedAt": "2026-01-09T19:15:19.683Z",
    "__v": 0
}
```

#### Retorna um evento pelo ID

```http
  GET /api/events/{id}
```
```json
{
    "_id": "696154269dcc4f2c6f27d0bd",
    "title": "Alterando titulo do evento",
    "organizer": {
        "name": "Frank Rodrigues Oliveira",
        "email": "frank@test.com",
        "_id": "6942c4e46247901aca0378f5"
    },
    "attendees": [
        "convidado@test.com"
    ],
    "start": "2026-01-09T19:00:34.505Z",
    "end": "2026-01-09T20:00:34.505Z",
    "location": "Alterando o local do evento",
    "description": "Alterando a descrição do evento",
    "createdAt": "2026-01-09T19:16:54.922Z",
    "updatedAt": "2026-01-09T19:21:26.159Z",
    "__v": 0
}
```
