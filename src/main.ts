import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(); // Allow all origins (default)
  app.use('/public', express.static(join(__dirname, '..', 'public'))) // Enabling static file serving to add images to the emails
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3001);
}
bootstrap().then(() => undefined);
