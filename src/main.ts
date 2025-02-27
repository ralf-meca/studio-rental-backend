import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EmailService } from './emails/emails.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const emailService = app.get(EmailService);

  // await emailService.sendEmail('ralphmecca@gmail.com', 'Test Email', 'Hello from SendGrid!');
  app.enableCors(); // Allow all origins (default)

  await app.listen(3001);
}
bootstrap().then(value => undefined);
