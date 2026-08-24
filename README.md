# Zeno

<!-- Add the final dashboard screenshot at design/dashboard.png. -->

<p align="center">
  <img src="./design/dashboard.png" alt="Zeno dashboard" width="100%" />
</p>

<p align="center">
  <a href="#themes">Explore every Zeno theme</a>
</p>

## Description

Zeno is the effortless way to take control of your financial life. Connect any supported Brazilian bank through Open Finance, securely powered by [Pluggy](https://pluggy.ai), and let Zeno automatically bring your accounts, balances, and transactions together in one clear dashboard.

No more spreadsheets, forgotten purchases, or manually entering every expense. Zeno turns scattered financial data into an organized, up-to-date view of your money, so you spend less time tracking transactions and more time making confident decisions.

## Tech Stack

<p>
  <img src="https://img.shields.io/badge/TanStack-Router_%26_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanStack Router and Query" />
  <img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p>
  <img src="https://img.shields.io/badge/Fastify-5-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Bun-1.3-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
</p>

The frontend is built with React and Vite, using the TanStack ecosystem for type-safe routing and server-state management. Tailwind CSS and shadcn provide the foundation for the interface and theming.

The backend is a TypeScript API powered by Fastify, with PostgreSQL as the database and Prisma for schema management, migrations, and type-safe data access. Pluggy connects Zeno to Brazil's Open Finance ecosystem.

## How to Run the Project

### Prerequisites

Install the following tools before you begin:

- [Git](https://git-scm.com/)
- [Bun 1.3.2 or newer](https://bun.sh/)
- [Node.js 24.4.1 or newer](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine with Compose
- Pluggy API credentials to test real Open Finance connections

### 1. Clone the repository

```bash
git clone https://github.com/DFedizko/zeno.git
cd zeno
```

### 2. Create the environment files

The repository includes safe example files with every required variable. From the repository root, copy them before starting the application.

On macOS, Linux, or Git Bash:

```bash
cp api/.env.example api/.env
cp app/.env.example app/.env
```

On Windows PowerShell:

```powershell
Copy-Item api/.env.example api/.env
Copy-Item app/.env.example app/.env
```

Open `api/.env` and replace `JWT_SECRET` with a long random value. Add your `PLUGGY_CLIENT_ID` and `PLUGGY_CLIENT_SECRET` from the Pluggy dashboard if you want to connect a real bank. The default database URL already matches the included Docker configuration.

The frontend example points to the local API at `http://localhost:3334`, so `app/.env` does not need any changes for local development.

Never commit either `.env` file. Only the `.env.example` templates belong in Git.

### 3. Install the dependencies

The frontend and backend are separate projects, so install the dependencies in both directories:

```bash
cd api
bun install

cd ../app
bun install
```

### 4. Start PostgreSQL with Docker

Make sure Docker is running. Then, from the repository root, start the PostgreSQL container:

```bash
cd api
docker compose up -d --wait db
```

Check that the database is running:

```bash
docker compose ps
```

The `--wait` option waits for the database health check to pass before returning. The `db` service should be listed as healthy and PostgreSQL will be available on port `5432`.

### 5. Prepare the database

Still inside the `api` directory, apply the migrations and generate the Prisma client:

```bash
bunx prisma migrate deploy
bunx prisma generate
```

Use `bunx prisma migrate dev` only when you intentionally change `api/prisma/schema.prisma` and need to create a new development migration.

### 6. Start the backend

In the first terminal:

```bash
cd api
bun run dev
```

The API runs at `http://localhost:3334`, and its interactive documentation is available at `http://localhost:3334/docs`.

Keep this terminal open while using the application.

### 7. Generate the API client

With the backend running, open a second terminal and run:

```bash
cd app
bun run generate:api
```

This command performs both required tasks:

1. Downloads the latest OpenAPI document from `http://localhost:3334/openapi.json`.
2. Uses Kubb to generate TypeScript models, request clients, TanStack Query hooks, Zod schemas, and test mocks inside `app/src/gen`.

The Kubb CLI is installed locally and pinned to the same version as the Kubb plugins. You do not need to install Kubb globally or run `bunx kubb`.

Run `bun run generate:api` again whenever an API route or schema changes.

### 8. Start the frontend

In the second terminal, after generating the API client:

```bash
cd app
bun run dev
```

Open `http://localhost:5173` in your browser.

### Local addresses

| Service | Address |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:3334` |
| API documentation | `http://localhost:3334/docs` |
| OpenAPI document | `http://localhost:3334/openapi.json` |
| PostgreSQL | `localhost:5432` |

### Common setup problems

- If Docker reports that port `5432` is already in use, stop the other local PostgreSQL service or change the mapped port and `DATABASE_URL` together.
- If API client generation says it cannot download the OpenAPI document, start the backend first and confirm that `http://localhost:3334/openapi.json` opens.
- If Prisma cannot connect to the database, run `docker compose ps` inside `api` and confirm that the `db` service is running.
- If the frontend cannot reach the backend, confirm that `VITE_API_URL` in `app/.env` is `http://localhost:3334` and restart Vite.

### Stop the database

When you finish developing, stop the PostgreSQL container with:

```bash
cd api
docker compose down
```

## Themes

Zeno supports multiple themes designed to make financial management feel personal without compromising clarity. Theme screenshots will be added here as they become available.

<!-- Add theme screenshots using the following structure:

### Theme name

![Zeno theme name](./design/themes/theme-name.png)

Repeat the block above for every theme.
-->

## Author and License

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/74017914?v=4" width="115" alt="Pedro Fedizko de Castro"><br><sub>Pedro Fedizko de Castro</sub>](https://github.com/DFedizko) |
| :---: |

This project is available under the [MIT License](./LICENSE).
