import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initDB } from './mongodb/connection.service';
import { ValidationPipe } from '@nestjs/common';
import { connectToRedis } from './caching/redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env['PORT']);
  initDB();
  connectToRedis();
}
bootstrap();
