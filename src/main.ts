import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Replace with your frontend's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Enable if you're using credentials (cookies, HTTP authentication)
  });
  app.use(cookieParser()); 
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8080);
}
bootstrap();
