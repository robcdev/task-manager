# Task Manager

A full-stack task management app built with an Angular frontend and a NestJS API, using PostgreSQL for persistence. The repo is an Nx workspace.

## What's inside

- `apps/frontend`: Angular UI (Material)
- `apps/backend`: NestJS API (TypeORM)
- `libs/shared`: shared DTOs/types used by both apps

## Prerequisites

- Node.js 20+ and npm
- PostgreSQL 16+ (local dev) OR Docker + Docker Compose (containerized dev)

## Environment setup

1. Copy the example env file:

```sh
cp .env.example .env
```

2. Adjust values in `.env` if needed (ports, DB credentials, etc.).

## Run with Docker (recommended)

```sh
docker-compose up -d
```

Access:
- Frontend: `http://localhost:4200`
- Backend: `http://localhost:3000`
- pgAdmin: `http://localhost:5050`

For more Docker details (pgAdmin setup, logs, troubleshooting), see `DOCKER.md`.

## Run locally (no Docker)

1. Install dependencies:

```sh
npm install
```

2. Start PostgreSQL locally using the same settings from `.env`. Example:

```sh
createdb -h localhost -p 5432 -U admin task_manager
```

3. Start both apps:

```sh
npm run dev
```

Or run them separately:

```sh
npm run start:be
npm run start:fe
```

## Useful scripts

- `npm run dev`: serve frontend + backend in parallel
- `npm run start:fe`: serve frontend only
- `npm run start:be`: serve backend only
- `npm run seed`: seed the database
- `npm run seed:clear`: clear seeded data
- `npm run test`: run frontend + backend tests
- `npm run lint`: lint all projects

## Seeding the database

Local (no Docker):

```sh
npm run seed
```

To clear seeded data:

```sh
npm run seed:clear
```

Docker:

```sh
docker-compose exec backend npm run seed
```

Clear seeded data in Docker:

```sh
docker-compose exec backend npm run seed:clear
```

## Notes

- The backend reads DB config from `.env`.
- The frontend reads `API_URL` from `.env` (used for API base URL).

## Troubleshooting

- Port already in use: update `BACKEND_PORT`/`FRONTEND_PORT` in `.env`, then restart.
- DB connection errors: confirm PostgreSQL is running and matches `.env` values.
- Docker rebuild after deps change:

```sh
docker-compose up -d --build
```
