import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {EmailModule} from './emails/emails.module';
import {MongooseModule} from "@nestjs/mongoose";
import {AdminModule} from "./admin/admin.module";
import {ServeStaticModule} from '@nestjs/serve-static';
import {BlockedAvailabilityModule} from "./blockedAvailability/blocked-availability.module";
import {join} from "path";
import {ReservationModule} from "./reservation/reservation.module";
import {RentalsModule} from "./rentals/rentals.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        ServeStaticModule.forRoot(
            {
                rootPath: join(__dirname, '../../uploads'), // Serve from the 'uploads' folder
                serveRoot: '/uploads', // Set the base path for serving files
            },
            {
                rootPath: join(__dirname, '../../public'),
                serveRoot: '/public',
            },
        ),
        EmailModule,
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/studio-rental'),
        AdminModule,
        BlockedAvailabilityModule,
        ReservationModule,
        RentalsModule,
    ],
})
export class AppModule {
}
