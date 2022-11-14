import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // nest app instance
  const app = await NestFactory.create(AppModule, { cors: true });
  // validation
  // app.useGlobalPipes(new ValidationPipe());
  // lunch app
  await app.listen(8000);
}
bootstrap();
