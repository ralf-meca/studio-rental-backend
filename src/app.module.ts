import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {EmailModule} from './emails/emails.module';
import {MongooseModule} from "@nestjs/mongoose";
import {AdminModule} from "./admin/admin.module";
import {BlockedHoursModule} from "./blockedHours/blockedHours.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        EmailModule,
        MongooseModule.forRoot('mongodb://localhost:27017/studio-rental'),
        AdminModule,
        BlockedHoursModule,
    ],
    // controllers: [AvailabilityController]
})
export class AppModule {
}
