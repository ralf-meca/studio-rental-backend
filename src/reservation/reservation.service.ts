import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Reservation, ReservationDocument,} from './schema/reservation.schema';
import {BlockedAvailabilityService} from '../blockedAvailability/blocked-availability.service';
import {CreateReservationDto} from "./dto/reservation.dto";
import { EmailService } from '../emails/emails.service';

@Injectable()
export class ReservationService {
    constructor(
        @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
        private readonly blockedAvailabilityService: BlockedAvailabilityService,
        private readonly emailService: EmailService
    ) {
    }

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        let blockedHours: string[] = []
        let selectedLights: string[] = []

        // --- Parse blockedHours ---
        if (!!createReservationDto.blockedHours) {
            blockedHours = JSON.parse(createReservationDto.blockedHours)
        }

        // --- Parse selectedLights ---
        if (!!createReservationDto.selectedLights) {
            selectedLights = JSON.parse(createReservationDto.selectedLights)
        }

        // --- Create and Save the Reservation ---
        const reservation = new this.reservationModel({
            ...createReservationDto,
            selectedLights: selectedLights,
            blockedHours: blockedHours,
            totalPrice: Number(createReservationDto.totalPrice)
        });
        const savedReservation = await reservation.save();
        console.log('savedReservation',savedReservation)
        console.log('createReservationDto.totalPrice',createReservationDto.totalPrice)

        // Update blocked availability.
        await this.blockedAvailabilityService.blockHours({
            date: savedReservation.date,
            hoursBlocked: blockedHours,
            isBlockedByAdmin: false, // Since this is coming from a reservation
        })

        // **Send Email Confirmation to User**
        await this.emailService.sendReservationReceivedEmail(savedReservation);
        await this.emailService.sendReservationArrivedAdminEmail(savedReservation);

        return savedReservation;
    }

    async getReservationsByMonth(yearMonth: string): Promise<Reservation[]> {
        // Ensure yearMonth is in "YYYY-MM" format
        if (!/^\d{4}-\d{2}$/.test(yearMonth)) {
            throw new BadRequestException('Invalid date format. Use "YYYY-MM".');
        }

        // Create a regex pattern to match the given year and month
        const regexPattern = new RegExp(`^${yearMonth}-\\d{2}$`);

        // Query the database
        return this.reservationModel.find({ date: { $regex: regexPattern } }).exec();
    }
}
