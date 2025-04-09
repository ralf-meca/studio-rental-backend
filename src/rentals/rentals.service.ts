import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rental, RentalDocument } from './schemas/rentals.schema';

@Injectable()
export class RentalsService {
    constructor(@InjectModel(Rental.name) private rentalModel: Model<RentalDocument>) {}

    async create(rentalData: Partial<Rental>): Promise<Rental> {
        const newRental = new this.rentalModel(rentalData);
        return newRental.save();
    }

    async findAll(): Promise<Rental[]> {
        return this.rentalModel.find().exec();
    }

    async findById(id: string): Promise<Rental | null> {
        return this.rentalModel.findById(id).exec();
    }

    async update(id: string, rentalData: Partial<Rental>): Promise<Rental | null> {
        return this.rentalModel.findByIdAndUpdate(id, rentalData, { new: true }).exec();
    }

    async delete(id: string): Promise<Rental | null> {
        return this.rentalModel.findByIdAndDelete(id).exec();
    }
}
