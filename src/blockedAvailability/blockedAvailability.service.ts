import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {BlockedAvailability, BlockedAvailabilityDocument} from './schemas/blockedAvailability.schema';

@Injectable()
export class BlockedAvailabilityService {
    constructor(
        @InjectModel(BlockedAvailability.name)
        private blockedAvailabilityModel: Model<BlockedAvailabilityDocument>
    ) {}

    // Create a new record
    async create(data: Partial<BlockedAvailability>): Promise<BlockedAvailability> {
        const record = new this.blockedAvailabilityModel(data);
        return record.save();
    }

    // Retrieve all blocked records
    async findAll(): Promise<BlockedAvailability[]> {
        return this.blockedAvailabilityModel.find().exec();
    }

    // Find a record by date
    async findByDate(date: string): Promise<BlockedAvailabilityDocument | null> {
        return this.blockedAvailabilityModel.findOne({ date }).exec();
    }

    // Find all blocked records for a given month (formatted as "YYYY-MM")
    async findByMonth(month: string): Promise<BlockedAvailabilityDocument[]> {
        // Create a regular expression to match dates that start with the given month.
        const regex = new RegExp(`^${month}`);
        return this.blockedAvailabilityModel.find({ date: { $regex: regex } }).exec();
    }

    // Update a record by date
    async addBlockedHours(date: string, hoursToBlock: string[]): Promise<BlockedAvailability | null> {

        return await this.blockedAvailabilityModel.findOneAndUpdate(
            {date}, // Find document by date
            {$push: {hoursBlocked: {$each: hoursToBlock}}}, // Push new hours to array
            {new: true, upsert: true} // Return updated document, create if missing
        ).exec();
    }

    // Remove blocked hours
    async removeBlockedHours(date: string, hoursToUnblock: string[]): Promise<BlockedAvailability | null> {
        const document = await this.blockedAvailabilityModel.findOne({ date });
        if (!document) return null;

        document.hoursBlocked = document.hoursBlocked.filter(hour => !hoursToUnblock.includes(hour));

        return document.save(); // Save the updated document

    }

    // Delete a record by id
    async delete(id: string): Promise<BlockedAvailability | null> {
        return this.blockedAvailabilityModel.findByIdAndDelete(id).exec();
    }

    // Query 1: Save specific hours for a date (partial day block)
    async blockHours(data: { date: string; hoursBlocked: string[]; isBlockedByAdmin: boolean }): Promise<BlockedAvailability> {
        const { date, hoursBlocked, isBlockedByAdmin } = data;
        const existing = await this.findByDate(date);
        if (existing) {
            // Update existing record
            existing.hoursBlocked = hoursBlocked;
            existing.isAllDayBlocked = false;
            existing.isBlockedByAdmin = isBlockedByAdmin;
            return existing.save();
        } else {
            // Create new record
            return this.create({
                date,
                hoursBlocked,
                isAllDayBlocked: false,
                isBlockedByAdmin,
            });
        }
    }

    // Query 2: Block an entire day
    async toggleAllDayBlockUnblock(date: string, isBlocked: boolean): Promise<BlockedAvailability | null> {
        return this.blockedAvailabilityModel.findOneAndUpdate(
            { date },
            { isAllDayBlocked: isBlocked, isBlockedByAdmin: isBlocked}, // Only update isAllDayBlocked and isBlockedByAdmin
            { new: true, upsert: true }
        ).exec();
    }

    // Query 3: Bulk block multiple dates (each as a full-day block)
    async toggleBulkBlockUnBlock(data: { dates: string[]; isBlockedByAdmin: boolean }): Promise<BlockedAvailability[]> {
        const { dates, isBlockedByAdmin } = data;
        const blockedDates: BlockedAvailability[] = [];

        // For each date, block the whole day (using blockDay logic)
        for (const date of dates) {
            const record = await this.toggleAllDayBlockUnblock( date, isBlockedByAdmin);
            !!record && blockedDates.push(record);
        }
        return blockedDates;
    }
}
