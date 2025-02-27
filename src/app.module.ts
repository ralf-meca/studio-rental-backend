import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {EmailModule} from './emails/emails.module';
import {AvailabilityController} from "./availability/availability.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {AvailabilityModule} from "./availability/availability.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        EmailModule,
        MongooseModule.forRoot('mongodb://localhost:27017/studio-rental'),
        AvailabilityModule
    ],
    controllers: [AvailabilityController]
})
export class AppModule {
}
