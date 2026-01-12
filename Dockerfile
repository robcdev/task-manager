# Base stage - Node 20 LTS (matches @types/node version)
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Development stage
FROM base AS dev
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source code
COPY . .

# Expose ports for frontend and backend
EXPOSE 4200 3000

# Default command for development
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS builder
WORKDIR /app

# Copy dependencies and source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build both frontend and backend
RUN npm run build

# Production stage for backend
FROM base AS production-backend
WORKDIR /app

ENV NODE_ENV=production

# Copy built backend
COPY --from=builder /app/dist/apps/backend ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./

EXPOSE 3000

CMD ["node", "dist/main.js"]

# Production stage for frontend (nginx)
FROM nginx:alpine AS production-frontend

# Copy built frontend
COPY --from=builder /app/dist/apps/frontend/browser /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
