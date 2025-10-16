# 1. Setup & Structure
> Prepare your workspace and create the base structure for SSyncSpace.

---

## 🧭 Goal
Set up a **monorepo** with separate frontend and backend projects using the **Next.js App Router** and NestJS, managed with VS Code on Linux.

---

## ⚙️ Step 1: Create the base directory
```bash
mkdir ssyncspace
cd ssyncspace
git init
mkdir apps prisma docs
```

- `apps/` → will hold `web` (frontend) and `api` (backend)  
- `prisma/` → shared database schema  
- `docs/` → developer notes  

---

## ⚙️ Step 2: Initialize root Node project
```bash
npm init -y
```

---

## ⚙️ Step 3: Create frontend (Next.js)
```bash
cd apps
npx create-next-app@latest web --typescript --eslint
```

Test server:
```bash
cd web
npm run dev
```

---

## ⚙️ Step 4: Create backend (NestJS)
```bash
cd ../
npm i -g @nestjs/cli
nest new api
```

Test backend:
```bash
cd api
npm run start:dev
```

---

## 🧩 Project Layout
```text
ssyncspace/
├─ apps/
│  ├─ web/  # Next.js frontend
│  └─ api/  # NestJS backend
├─ prisma/
├─ docs/
└─ package.json
```

---

## 📘 Reference
| Command | Purpose |
|---------|---------|
| `npm init -y` | Create root Node project |
| `npx create-next-app` | Generate frontend |
| `nest new api` | Generate backend |
| `npm run dev` | Start frontend |
| `npm run start:dev` | Start backend |
