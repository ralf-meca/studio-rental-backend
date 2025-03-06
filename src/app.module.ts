import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {EmailModule} from './emails/emails.module';
import {MongooseModule} from "@nestjs/mongoose";
import {AdminModule} from "./admin/admin.module";
import {BlockedAvailabilityModule} from "./blockedAvailability/blockedAvailability.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        EmailModule,
        MongooseModule.forRoot('mongodb://localhost:27017/studio-rental'),
        AdminModule,
        BlockedAvailabilityModule,
    ],
    // controllers: [AvailabilityController]
})
export class AppModule {
}
