import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmailService } from './emails/emails.service';
import * as express from 'express';
import {join} from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Allow all origins (default)
  app.use('/public', express.static(join(__dirname, '..', 'public'))) // Enabling static file serving to add images to the emails

  await app.listen(3001);
}
bootstrap().then(value => undefined);
