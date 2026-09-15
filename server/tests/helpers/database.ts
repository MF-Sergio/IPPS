import { Pool } from "pg";
import { loadEnvFiles } from "../../src/infrastructure/config/env.ts";

loadEnvFiles(process.cwd());

const connectionString = process.env.TEST_DATABASE_URL?.trim();
if (!connectionString) {
  throw new Error(
    "TEST_DATABASE_URL nao configurada. Defina uma URL de banco exclusiva para os testes.",
  );
}

const databaseName = new URL(connectionString).pathname.slice(1);
if (!/(?:_|-)test$/i.test(databaseName)) {
  throw new Error(
    `Banco de teste inseguro: ${databaseName}. O nome deve terminar com _test ou -test.`,
  );
}

// O repository importa este valor via DATABASE_URL; durante os testes, force-o
// para o banco explicitamente reservado para a suíte.
process.env.DATABASE_URL = connectionString;

export const testPool = new Pool({ connectionString });

export async function clearDatabase(): Promise<void> {
  // Cada teste parte de um banco vazio sem permitir acidentalmente o principal.
  await testPool.query(`
    TRUNCATE TABLE
      donation_status_history,
      donation_addresses,
      donations
    RESTART IDENTITY
    CASCADE;
  `);
}

export async function closeDatabase(): Promise<void> {
  await testPool.end();
}