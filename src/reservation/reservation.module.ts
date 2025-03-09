import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ReservationController} from './reservation.controller';
import {ReservationService} from './reservation.service';
import {Reservation, ReservationSchema} from './schema/reservation.schema';
import {BlockedAvailabilityModule} from "../blockedAvailability/blocked-availability.module";
import {EmailService} from "../emails/emails.service";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Reservation.name, schema: ReservationSchema}]),
        BlockedAvailabilityModule, // Import the module so its providers are available
    ],
    controllers: [ReservationController],
    providers: [ReservationService, EmailService],
})
export class ReservationModule {
}
