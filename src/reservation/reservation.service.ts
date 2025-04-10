import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Reservation, ReservationDocument,} from './schema/reservation.schema';
import {BlockedAvailabilityService} from '../blockedAvailability/blocked-availability.service';
import {CreateReservationDto} from "./dto/reservation.dto";
import {EmailService} from '../emails/emails.service';

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

        // Update blocked availability.
        await this.blockedAvailabilityService.blockHours({
            date: savedReservation.date,
            hoursBlocked: blockedHours,
            isBlockedByAdmin: false, // Since this is coming from a reservation
        })

        // Send Email to User
        await this.emailService.sendReservationReceivedEmail(savedReservation);

        // Send Email to Admin
        await this.emailService.sendReservationArrivedAdminEmail(savedReservation);

        return savedReservation;
    }

    async updateReservation(id: string, updateData: { status: string; doorCode?: string }) {
        const updatedFields: any = {status: updateData.status};

        // Only add doorCode if it exists in the request
        if (updateData.doorCode) {
            updatedFields.doorCode = updateData.doorCode;
        }

        const updatedReservation = await this.reservationModel.findByIdAndUpdate(
            id,
            {$set: updatedFields},
            {new: true} //Return the updated document
        );

        // Send email to user when reservation status is updated
        if (updatedReservation?.status === "accepted") {
            await this.emailService.sendReservationAcceptedEmail(updatedReservation);
            // Block hours if previously it was refused and they were unblocked
            await this.blockedAvailabilityService.addBlockedHours(updatedReservation?.date, updatedReservation?.blockedHours);
        }
        if (updatedReservation?.status === "refused") {
            // Sends Email about the refusal
            await this.emailService.sendReservationRejectedEmail(updatedReservation)
            // Unblocks reservation hours to be available for other users
            await this.blockedAvailabilityService.removeBlockedHours(updatedReservation?.date, updatedReservation?.blockedHours);
        }

        return updatedReservation;
    }

    async getReservationsByMonth(yearMonth: string): Promise<Reservation[]> {
        // Ensure yearMonth is in "YYYY-MM" format
        if (!/^\d{4}-\d{2}$/.test(yearMonth)) {
            throw new BadRequestException('Invalid date format. Use "YYYY-MM".');
        }

        // Create a regex pattern to match the given year and month
        const regexPattern = new RegExp(`^${yearMonth}-\\d{2}$`);

        // Query the database
        return this.reservationModel.find({date: {$regex: regexPattern}}).exec();
    }
}
