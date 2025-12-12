import { prisma } from '../database/prisma.js';

async function setupSchemas() {
  try {
    console.log('🔧 Creating PostgreSQL schemas...');
    
    // Create the schemas (namespaces)
    // await prisma.$executeRaw`CREATE SCHEMA IF NOT EXISTS root;`;
    // await prisma.$executeRaw`CREATE SCHEMA IF NOT EXISTS islam;`;
    await prisma.$executeRaw`CREATE SCHEMA IF NOT EXISTS discord;`;
    
    console.log('✅ Schemas created successfully!');
    
    // Grant permissions
    // await prisma.$executeRaw`GRANT ALL ON SCHEMA root TO ssync_user;`;
    // await prisma.$executeRaw`GRANT ALL ON SCHEMA islam TO ssync_user;`;
    await prisma.$executeRaw`GRANT ALL ON SCHEMA discord TO ssync_user;`;
    
    console.log('✅ Permissions granted!');
    
  } catch (error) {
    console.error('❌ Error setting up schemas:', error);
  } finally {
    await prisma.$disconnect();
  }
}

setupSchemas();