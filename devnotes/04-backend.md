# 4. Backend Setup (NestJS + Prisma + PostgreSQL)

---

## ✨ Goal
Set up a scalable backend with NestJS and Prisma ORM connected to PostgreSQL.

---

## ⚙️ Step 1: Initialize Prisma
```bash
cd apps/api
npm install prisma --save-dev
npx prisma init
```

- `.env` → set `DATABASE_URL="postgresql://user:pass@localhost:5432/ssyncspace"`  

---

## ⚙️ Step 2: Define models in `prisma/schema.prisma`
```prisma
model User {
  id        Int      @id @default(autoincrement())
  username  String
  discordId String   @unique
  role      String
  createdAt DateTime @default(now())
}
```

---

## ⚙️ Step 3: Migrate
```bash
npx prisma migrate dev --name init
npx prisma studio
```

---

## ⚙️ Step 4: Create NestJS modules
- `users` module:
```bash
nest g module users
nest g service users
nest g controller users
```

- Basic REST endpoint (`users.controller.ts`):
```ts
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

---

### 🧩 Reference
| Command | Purpose |
|---------|---------|
| `npx prisma init` | Initialize Prisma |
| `npx prisma migrate dev` | Apply migrations |
| `npx prisma studio` | GUI to view DB |
| `nest g module/service/controller` | Generate backend structure |
