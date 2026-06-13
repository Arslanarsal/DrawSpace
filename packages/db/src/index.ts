import { config } from 'dotenv';
import path from 'path';
import { existsSync } from 'fs';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

// Always load packages/db/.env, no matter which app imports this package.
// __dirname is dist/src when built, or src when run via tsx — handle both.
const builtEnv = path.join(__dirname, '../../.env');
const sourceEnv = path.join(__dirname, '../.env');
config({ path: existsSync(builtEnv) ? builtEnv : sourceEnv });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

export { prisma };
