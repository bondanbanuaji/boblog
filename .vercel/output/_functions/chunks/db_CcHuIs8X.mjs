import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new PrismaClient();

export { db as d };
