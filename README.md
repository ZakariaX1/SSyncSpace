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
