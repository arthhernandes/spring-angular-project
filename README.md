# Nós da Mota 🧶 - Sistema de Gestão de Encomendas

O **Nós da Mota** é um sistema Full Stack desenvolvido para gerenciar encomendas de produtos artesanais (crochê). O foco do projeto é aplicar conceitos avançados de arquitetura de software, segurança e experiência do usuário em um cenário real de negócio.

## 🚀 Tecnologias Utilizadas

### Frontend

* **Angular 21:** Uso de *Signals* para reatividade e *Interceptors* para gestão de sessões.
* **TypeScript:** Tipagem estrita para maior segurança no desenvolvimento.
* **Chart.js:** Visualização de dados e faturamento em tempo real.
* **Bootstrap/SASS:** Interface responsiva e moderna.

### Backend

* **Java 21 & Spring Boot 3:** Base sólida para uma API REST escalável.
* **Spring Security & JWT:** Autenticação e autorização *stateless*.
* **Spring Data JPA:** Persistência de dados com PostgreSQL.
* **Maven:** Gerenciamento de dependências.

### Infraestrutura

* **Docker & Docker Compose:** Containerização de toda a aplicação.
* **PostgreSQL 16:** Banco de dados relacional com scripts de inicialização automática (`init.sql`).

---

## 🛡️ Segurança e Boas Práticas

* **JWT (JSON Web Token):** Proteção de rotas e controle de acesso.
* **Variáveis de Ambiente:** Uso de arquivos `.env` para proteção de credenciais sensíveis (DB e Secrets).
* **Tratamento de Exceções:** Implementação de `AuthenticationEntryPoint` para gerenciar erros de autenticação (401 Unauthorized) de forma amigável no frontend.
* **Persistência de Dados:** Uso de *Docker Volumes* para garantir que as informações não sejam perdidas ao reiniciar os containers.

---

## 📊 Funcionalidades

* [x] CRUD completo de Clientes.
* [x] Gestão de Pedidos com relacionamento `@ManyToMany` com Produtos.
* [x] Dashboard de Faturamento com gráficos dinâmicos.
* [x] Sistema de Login seguro.
* [ ] Galeria de Produtos com variações de cores e preços (Em desenvolvimento).

---

## 🛠️ Como rodar o projeto

### Pré-requisitos

* Docker e Docker Compose instalados.

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/arthhernandes/spring-angular-project.git

```


2. Crie um arquivo `.env` na raiz do projeto seguindo o modelo:
```env
DB_NAME=craft_db_novo
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
JWT_SECRET=sua_chave_secreta

```


3. Suba o banco de dados via Docker:
```bash
docker-compose up -d

```


4. Inicie o Backend (Spring Boot) via sua IDE (IntelliJ/VS Code).
5. Inicie o Frontend (Angular):
```bash
cd frontend
npm install
ng serve

```



---

## 👨‍💻 Autor

**Arthur Hernandes** – Dev Full Stack.

---
