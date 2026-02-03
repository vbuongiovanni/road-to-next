import 'dotenv/config';
// import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma';

const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ datasourceUrl: connectionString });

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Using singleton pattern to prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
