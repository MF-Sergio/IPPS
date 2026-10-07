import { Pool } from 'pg';

let pool: Pool | undefined;

export function getPostgresPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL?.trim();
    if (!connectionString) {
      throw new Error("DATABASE_URL nao configurada para o PostgreSQL.");
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}

export const initPostgres = async () => {
  const result = await getPostgresPool().query(
    'SELECT current_database(), current_user, NOW()'
  );

  console.log(result.rows);
};