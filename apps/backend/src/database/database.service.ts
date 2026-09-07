import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Pool, type QueryResult, type QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  async query<T extends QueryResultRow = QueryResultRow>(
    query: string,
    values: unknown[],
  ): Promise<QueryResult<T>> {
    return this.pool.query<T>(query, values);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
