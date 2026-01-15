# Task Manager

A full-stack task management application built with modern web technologies to ensure type safety, maintainability, and scalability. The project leverages a monorepo architecture to share libraries, types, and interfaces across the frontend and backend, enabling consistent data models and reducing code duplication.

## Technologies

- **Frontend**: Angular 18+ with Angular Material for UI components
- **Backend**: NestJS with TypeORM for database operations
- **Database**: PostgreSQL 16+ for data persistence
- **Monorepo**: Nx workspace for efficient project management and code sharing
- **Containerization**: Docker and Docker Compose for consistent development environments

## Architecture

The monorepo structure enables seamless code sharing and type safety across the entire stack:

- `apps/frontend`: Angular application with Material Design components
- `apps/backend`: NestJS RESTful API with TypeORM entities
- `libs/shared`: Shared libraries containing DTOs, types, and interfaces used by both applications

## Planned features

- **Task Detail View**: Enhance UI to display individual task details alongside the list/table view for improved visibility and context
- **User Authentication & Settings**: Implement login module with current user recognition and a dedicated settings section for user preferences
- **Theme Customization**: Add support for multiple UI themes (light/dark mode) with user-configurable preferences
- **Timezone Support**: Enable timezone selection and automatic conversion for date/time displays
- **Notification System**: Replace browser alerts with a toast notification system for better user experience and non-intrusive messaging
- **Responsive Table Design**: Optimize table layout for mobile and tablet devices with adaptive column display and touch-friendly interactions
- **Virtual Scrolling**: Implement virtual scrolling in tables to efficiently handle large datasets and improve rendering performance
- **Flexible Data Loading**: Add "Load More" functionality as an alternative to traditional pagination for seamless infinite scroll experiences
- **Advanced Filtering**: Enable comprehensive filtering capabilities to search and filter tasks by user, name, description, date ranges, and status
- **Test Coverage**: Implement comprehensive unit tests and end-to-end tests to ensure code quality and application reliability

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
