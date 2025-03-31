# Backend API

Este projeto é uma API desenvolvida em Node.js utilizando Express, TypeScript, Prisma como ORM, PostgreSQL como banco de dados, e Docker para containerização. Também utiliza Jest para testes.

## 🚀 Configuração do Ambiente

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (caso queira rodar fora do Docker)

## 🛠️ Como Rodar o Projeto

1. **Clone o repositório:**

   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

   ```

2. **Suba os container docker:**

   ```sh
   docker-compose up -d

   ```

3. **Acesse a documentação da API:**

   ```sh
   http://localhost:3000/docs/

   ```

4. **Para parar os containers:**

   ```sh
   docker compose down
   ```
