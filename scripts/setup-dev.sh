#!/bin/bash

echo "🚀 Setting up SSyncSpace development environment..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please fill in your Discord OAuth credentials in .env file"
else
    echo "✅ .env file already exists"
fi

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up postgres redis -d

# Wait for postgres to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Install dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Push database schema
echo "🗄️  Pushing database schema..."
npm run db:push

echo "✨ Setup complete! You can now run:"
echo "   npm run dev"
echo ""
echo "🔗 Don't forget to:"
echo "   1. Set up Discord OAuth in Discord Developer Portal"
echo "   2. Add your Discord credentials to .env file"
echo "   3. Set NEXTAUTH_SECRET in .env file"
