# Docker Setup Guide

This document explains how to run the Task Manager application using Docker.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Quick Start

1. **Copy environment configuration**
   ```bash
   cp .env.example .env
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **View logs**
   ```bash
   docker-compose logs -f
   ```

## Services Overview

The Docker setup includes 4 services:

| Service    | Port | Description                    | Access URL                      |
|------------|------|--------------------------------|---------------------------------|
| Frontend   | 4200 | Angular application            | http://localhost:4200           |
| Backend    | 3000 | NestJS API                     | http://localhost:3000           |
| PostgreSQL | 5432 | Database                       | postgresql://localhost:5432     |
| pgAdmin    | 5050 | Database management UI         | http://localhost:5050           |

## Accessing Services

### Frontend Application
Open your browser and navigate to:
```
http://localhost:4200
```

### Backend API
The API is available at:
```
http://localhost:3000
```

### pgAdmin (Database Manager)

1. Open your browser and navigate to:
   ```
   http://localhost:5050
   ```

2. **Login credentials** (from `.env`):
   - Email: `admin@taskmanager.com`
   - Password: `admin123`

3. **Connect to PostgreSQL** inside pgAdmin:
   - Click "Add New Server"
   - **General Tab**:
     - Name: `Task Manager DB` (or any name)
   - **Connection Tab**:
     - Host: `postgres` (container name)
     - Port: `5432`
     - Maintenance database: `task_manager`
     - Username: `admin`
     - Password: `admin123`
   - Click "Save"

### Direct PostgreSQL Connection

Connect from your local machine using any PostgreSQL client:
```bash
psql -h localhost -p 5432 -U admin -d task_manager
```

Or use a connection string:
```
postgresql://admin:admin123@localhost:5432/task_manager
```

## Common Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### Stop services and remove volumes (⚠️ deletes database data)
```bash
docker-compose down -v
```

### Restart a specific service
```bash
docker-compose restart backend
docker-compose restart frontend
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Rebuild containers
```bash
# Rebuild all
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build backend
```

### Execute commands inside containers
```bash
# Backend shell
docker-compose exec backend sh

# Run npm commands in backend
docker-compose exec backend npm run test:be

# PostgreSQL shell
docker-compose exec postgres psql -U admin -d task_manager
```

## Environment Variables

All configurable values are in `.env`:

```env
# Application Ports
BACKEND_PORT=3000
FRONTEND_PORT=4200

# PostgreSQL Configuration
POSTGRES_DB=task_manager
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_PORT=5432

# pgAdmin Configuration
PGADMIN_EMAIL=admin@taskmanager.com
PGADMIN_PASSWORD=admin123
PGADMIN_PORT=5050
```

**Note**: After changing `.env`, restart services:
```bash
docker-compose down
docker-compose up -d
```

## Development Workflow

### Hot Reload

Both frontend and backend support hot reload. Changes to code will automatically reflect:

- **Frontend**: Edit files in `apps/frontend/` and see changes in browser
- **Backend**: Edit files in `apps/backend/` and NestJS will restart

### Install New Dependencies

When you add packages to `package.json`:

```bash
# Rebuild containers to install new dependencies
docker-compose down
docker-compose up -d --build
```

Or install inside running container:
```bash
docker-compose exec backend npm install
docker-compose exec frontend npm install
```

## Troubleshooting

### Port Already in Use

If you get port conflict errors:
1. Check what's using the port: `sudo lsof -i :4200`
2. Stop the conflicting service or change ports in `.env`

### Database Connection Failed

1. Check if PostgreSQL is healthy:
   ```bash
   docker-compose ps
   docker-compose logs postgres
   ```

2. Verify connection settings in `.env` match `DATABASE_URL`

### Frontend Can't Connect to Backend

Ensure `API_URL` in `.env` points to correct backend URL:
```env
API_URL=http://localhost:3000
```

### Clear Everything and Start Fresh

```bash
# Stop all services and remove volumes
docker-compose down -v

# Remove all containers, networks, and images
docker-compose down --rmi all -v

# Start fresh
docker-compose up -d --build
```

## Production Deployment

For production, you would:
1. Use production build targets in `Dockerfile`
2. Set `NODE_ENV=production` in `.env`
3. Use stronger passwords
4. Set up SSL/TLS certificates
5. Configure proper firewall rules
6. Use Docker secrets for sensitive data

Example production command:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Volume Management

### Backup Database

```bash
docker-compose exec postgres pg_dump -U admin task_manager > backup.sql
```

### Restore Database

```bash
cat backup.sql | docker-compose exec -T postgres psql -U admin -d task_manager
```

### View Volume Data

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect task-manager_postgres_data
```

## Network

All services run on the `task-manager-network` bridge network and can communicate using service names:

- `postgres` - Database host from backend
- `backend` - API host from frontend
- `frontend` - Frontend host
- `pgadmin` - pgAdmin host

## Health Checks

PostgreSQL includes a health check. The backend waits for PostgreSQL to be healthy before starting:

```yaml
depends_on:
  postgres:
    condition: service_healthy
```

Check service health:
```bash
docker-compose ps
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [pgAdmin Documentation](https://www.pgadmin.org/docs/)
