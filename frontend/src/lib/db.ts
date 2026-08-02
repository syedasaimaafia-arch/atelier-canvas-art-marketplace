import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../db/schema';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.opkoxhzngiptxuteuira:bwjdi130dh%3DW@aws-0-us-east-1.pooler.supabase.com:6543/postgres';

// For serverless / client pooling
const client = postgres(connectionString, { max: 1 });
export const db = drizzle(client, { schema });
