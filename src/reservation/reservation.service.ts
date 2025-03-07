import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation } from './schema/reservation.schema';
import { CreateReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
    constructor(@InjectModel(Reservation.name) private reservationModel: Model<Reservation>) {}

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        const reservation = new this.reservationModel(createReservationDto);
        return reservation.save();
    }
}
