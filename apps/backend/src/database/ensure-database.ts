import { Client } from 'pg';

const DEFAULT_POSTGRES_DB = 'postgres';

const getPostgresPort = () => {
  const parsed = parseInt(process.env.POSTGRES_PORT ?? '', 10);
  return Number.isNaN(parsed) ? 5432 : parsed;
};

const assertDatabaseName = (databaseName: string) => {
  if (!databaseName) {
    throw new Error('POSTGRES_DB is required to connect to the database.');
  }
  if (!/^[A-Za-z0-9_-]+$/.test(databaseName)) {
    throw new Error(
      `POSTGRES_DB "${databaseName}" contains unsupported characters.`,
    );
  }
};

export const ensureDatabaseExists = async () => {
  const databaseName = process.env.POSTGRES_DB ?? '';
  assertDatabaseName(databaseName);

  const client = new Client({
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: getPostgresPort(),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DEFAULT_DB ?? DEFAULT_POSTGRES_DB,
  });

  await client.connect();
  try {
    const result = await client.query(
      'SELECT 1 FROM pg_database WHERE datname = $1',
      [databaseName],
    );
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE "${databaseName}"`);
    }
  } finally {
    await client.end();
  }
};
