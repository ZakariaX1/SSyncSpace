# 6. Containerization (Docker + Compose)

---

## ✨ Goal
Run frontend, backend, and PostgreSQL in isolated containers.

---

### ⚙️ Step 1: Dockerfile (frontend)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
```

---

### ⚙️ Step 2: Dockerfile (backend)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
```

---

### ⚙️ Step 3: docker-compose.yml
```yaml
version: '3'
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: ssyncspace
    ports:
      - "5432:5432"
  api:
    build: ./apps/api
    depends_on:
      - db
    ports:
      - "3001:3000"
  web:
    build: ./apps/web
    depends_on:
      - api
    ports:
      - "3000:3000"
```
