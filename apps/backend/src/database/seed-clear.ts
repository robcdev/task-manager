import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app/app.module';
import { ensureDatabaseExists } from './ensure-database';

const clearDatabase = async () => {
  await ensureDatabaseExists();

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['error', 'warn'],
  });

  try {
    const dataSource = app.get(DataSource);
    await dataSource.query(
      'TRUNCATE TABLE "tasks", "categories", "users" RESTART IDENTITY CASCADE;',
    );
    console.log('Seed data cleared.');
  } finally {
    await app.close();
  }
};

clearDatabase().catch((error) => {
  console.error('Seed clear failed:', error);
  process.exit(1);
});
