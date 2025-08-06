# SSyncSpace

A space where the SSundee Server can sync together and share ideas, stats and see future plans.

## 🚀 Tech Stack

- **Frontend:** Next.js 14 with React 18 and TypeScript
- **Styling:** Tailwind CSS with shadcn/ui components
- **Backend:** Next.js API routes with tRPC for type-safe APIs
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js with Discord OAuth
- **Session Store:** Redis
- **Containerization:** Docker & Docker Compose

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── discord/           # Discord events section
│   ├── portfolio/         # Portfolio section
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
├── server/               # tRPC server setup
└── types/                # TypeScript type definitions
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Discord Application (for OAuth)

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd SSyncSpace
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env
```

Fill in your environment variables in `.env`:

```env
# Database
DATABASE_URL="postgresql://ssyncspace:password@localhost:5432/ssyncspace?schema=public"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Discord OAuth (get these from Discord Developer Portal)
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"

# Redis
REDIS_URL="redis://localhost:6379"
```

### 3. Discord Application Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a New Application
3. Go to OAuth2 section
4. Add redirect URI: `http://localhost:3000/api/auth/callback/discord`
5. Copy Client ID and Client Secret to your `.env` file

### 4. Start Development Environment

Using Docker Compose (recommended):

```bash
# Start databases
docker-compose up postgres redis -d

# Generate Prisma client and push schema
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

Or run everything with Docker:

```bash
docker-compose up
```

### 5. Database Management

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio
```

## 🔧 Service Management

### Starting Services

**Start everything (recommended for development):**
```bash
# Start databases in background
docker-compose up postgres redis -d

# Start Next.js development server
npm run dev
```

**Alternative - Start everything with Docker:**
```bash
# Start all services (databases + Next.js)
docker-compose up
```

### Stopping Services

**Stop Next.js development server:**
```bash
# Press Ctrl+C in the terminal where npm run dev is running
```

**Stop Docker containers:**
```bash
# Stop and remove containers
docker-compose down

# Stop containers but keep them for restart
docker-compose stop
```

**Stop specific services:**
```bash
# Stop only databases
docker-compose stop postgres redis

# Stop only a specific service
docker-compose stop postgres
```

### Restarting Services

**Restart Next.js development server:**
```bash
# Stop with Ctrl+C, then run again
npm run dev
```

**Restart Docker containers:**
```bash
# Restart all services
docker-compose restart

# Restart specific services
docker-compose restart postgres redis

# Full restart (stop, remove, and recreate)
docker-compose down && docker-compose up -d
```

### Monitoring Services

**Check service status:**
```bash
# List running containers
docker-compose ps

# View logs for all services
docker-compose logs

# View logs for specific service
docker-compose logs postgres
docker-compose logs redis

# Follow logs in real-time
docker-compose logs -f postgres
```

**Check Next.js server:**
```bash
# Development server runs on http://localhost:3000
# Check terminal output for compilation status and errors
```

### Troubleshooting

**If services won't start:**
```bash
# Check for port conflicts
sudo lsof -i :3000  # Next.js port
sudo lsof -i :5432  # PostgreSQL port
sudo lsof -i :6379  # Redis port

# Reset Docker containers completely
docker-compose down -v  # Removes volumes too (⚠️  deletes data)
docker-compose up -d postgres redis
```

**If database connection fails:**
```bash
# Recreate database
docker-compose down postgres
docker-compose up -d postgres
npm run db:push
```

**Clean restart everything:**
```bash
# Stop everything
docker-compose down
pkill -f "next-server"  # Kill any hanging Next.js processes

# Start fresh
docker-compose up -d postgres redis
npm run dev
```

## 🏢 Features

### Portfolio Section
- Static showcase of projects and skills
- Responsive design with project cards
- Technology tags

### Discord Events Section
- **Public Features:**
  - View upcoming events
  - Browse past events with engagement stats
  - Event details and schedules

- **Staff Features (Discord OAuth required):**
  - Submit event suggestions
  - View suggestion status
  - Staff dashboard

- **Admin Features:**
  - Approve/reject event suggestions
  - Create and manage events
  - View detailed analytics

## 🔐 Authentication & Authorization

- **Guest Users:** Can view public content
- **Discord Users:** Can sign in and access basic features
- **Staff Members:** Can submit event suggestions (based on Discord roles)
- **Admins:** Full access to event management

## 📊 Database Schema

Key entities:
- **Users:** Discord-linked user accounts with roles
- **Events:** Server events with engagement tracking
- **EventSuggestions:** Staff-submitted event ideas
- **Sessions/Accounts:** NextAuth.js authentication data

## 🚢 Deployment

For production deployment:

1. Set up PostgreSQL and Redis instances
2. Configure environment variables for production
3. Set up Discord OAuth for your domain
4. Deploy using your preferred platform (Vercel, Railway, etc.)

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome!

## 📝 License

MIT License - feel free to use this as inspiration for your own projects!
