# Collab Notes

Aplicação fullstack de notas colaborativas em tempo real com autenticação JWT, interface cyberpunk e arquitetura moderna utilizando Spring Boot + React.

---


## Tecnologias Utilizadas

### Backend
- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React
- TypeScript
- Vite
- Axios
- Context API
- CSS moderno com estética cyberpunk

---

## Funcionalidades

- Autenticação com JWT
- Cadastro e login de usuários
- CRUD de notas
- Edição em tempo real
- Interface cyberpunk responsiva
- Sistema de contexto global
- Comunicação REST API
- Persistência em banco de dados

---

## Estrutura do Projeto

```bash
collab-notes/
│
├── backend/
│   ├── src/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## Como Executar

## Backend

### Pré-requisitos
- Java 21+
- Maven
- PostgreSQL

### Configuração

Clone o repositório:

```bash
git clone https://github.com/VitorFoppa/collab-notes.git
```

Entre na pasta do backend:

```bash
cd backend
```

Configure o banco no:

```properties
application.properties
```

Exemplo:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/collab_notes
spring.datasource.username=postgres
spring.datasource.password=sua_senha
```

Execute:

```bash
./mvnw spring-boot:run
```

Servidor backend:

```bash
http://localhost:8080
```

---

## Frontend

Entre na pasta frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Frontend disponível em:

```bash
http://localhost:5173
```

---

## API Endpoints

### Auth

| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/auth/register` | Registrar usuário |
| POST | `/auth/login` | Login |

### Notes

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/notes` | Listar notas |
| POST | `/notes` | Criar nota |
| PUT | `/notes/{id}` | Atualizar nota |
| DELETE | `/notes/{id}` | Deletar nota |

---

## Segurança

O projeto utiliza:

- JWT Authentication
- Spring Security
- Rotas protegidas
- Interceptors no frontend
- Persistência de token no localStorage

---

## Melhorias Futuras

- WebSocket para colaboração em tempo real
- Compartilhamento de notas
- Markdown support
- Upload de arquivos
- Temas customizados
- Docker
- Deploy em cloud

---

## Autor

Desenvolvido por Vitor Foppa.

- GitHub: https://github.com/VitorFoppa

```