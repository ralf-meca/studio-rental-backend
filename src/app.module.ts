import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './emails/emails.module';
import { AvailabilityController } from "./avaiilability/availability.controller";

@Module({
  imports: [ConfigModule.forRoot(), EmailModule], // Load env variables & Email module
  controllers: [AvailabilityController]
})
export class AppModule {}
