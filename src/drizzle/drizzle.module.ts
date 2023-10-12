import { Module } from '@nestjs/common';
import { PG_CONNECTION } from '../constants';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema/index';

@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const connectionString = configService.get<string>('DATABASE_URL');
        const pool = new Pool({
          connectionString,
        });

        const db = drizzle(pool, { schema });
        return db;
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DrizzleModule {}
