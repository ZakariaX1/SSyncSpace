import 'dotenv/config';
import { PrismaClient } from './generated/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import { seedDatabase } from '../src/scripts/seedDatabase.js';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Please configure it before seeding.');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

seedDatabase(prisma)
  .then(() => {
    console.log('✅ Database seeded successfully!');
  })
  .catch((error) => {
    console.error('❌ Error seeding database:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
