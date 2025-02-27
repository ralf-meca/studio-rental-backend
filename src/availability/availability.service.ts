import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Availability, AvailabilityDocument } from './schemas/availability.schema';

@Injectable()
export class AvailabilityService {
    constructor(@InjectModel(Availability.name) private availabilityModel: Model<AvailabilityDocument>) {}

    // Create availability
    async create(data: Partial<Availability>): Promise<Availability> {
        const availability = new this.availabilityModel(data);
        return availability.save();
    }

    // Get all availability
    async findAll(): Promise<Availability[]> {
        return this.availabilityModel.find().exec();
    }

    // Get availability by date
    async findByDate(date: string): Promise<Availability | null> {
        return this.availabilityModel.findOne({ date }).exec();
    }

    // Update availability
    async update(id: string, data: Partial<Availability>): Promise<Availability | null> {
        return this.availabilityModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Delete availability
    async delete(id: string): Promise<Availability | null> {
        return this.availabilityModel.findByIdAndDelete(id).exec();
    }
}
