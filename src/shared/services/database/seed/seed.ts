import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from '../database.module';
import { SeedRunner } from './seedRunner';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(DatabaseModule);
  const seeder = app.get(SeedRunner);

  await seeder.run(true, 20);
  await app.close();
}

bootstrap();
