import { Config } from 'drizzle-kit';

export default {
  schema: './src/drizzle/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '123',
    database: 'drizzle',
  },
} satisfies Config;
