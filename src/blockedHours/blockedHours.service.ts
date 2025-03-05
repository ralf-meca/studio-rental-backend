import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlockedHours, BlockedHoursDocument } from './schemas/blockedHours.schema';

@Injectable()
export class BlockedHoursService {
    constructor(
        @InjectModel(BlockedHours.name)
        private blockedHoursModel: Model<BlockedHoursDocument>
    ) {}

    // Create a new record
    async create(data: Partial<BlockedHours>): Promise<BlockedHours> {
        const record = new this.blockedHoursModel(data);
        return record.save();
    }

    // Retrieve all blocked records
    async findAll(): Promise<BlockedHours[]> {
        return this.blockedHoursModel.find().exec();
    }

    // Find a record by date
    async findByDate(date: string): Promise<BlockedHoursDocument | null> {
        return this.blockedHoursModel.findOne({ date }).exec();
    }

    // Find all blocked records for a given month (formatted as "YYYY-MM")
    async findByMonth(month: string): Promise<BlockedHoursDocument[]> {
        // Create a regular expression to match dates that start with the given month.
        const regex = new RegExp(`^${month}`);
        return this.blockedHoursModel.find({ date: { $regex: regex } }).exec();
    }

    // Update a record by id
    async update(id: string, data: Partial<BlockedHours>): Promise<BlockedHours | null> {
        return this.blockedHoursModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    // Delete a record by id
    async delete(id: string): Promise<BlockedHours | null> {
        return this.blockedHoursModel.findByIdAndDelete(id).exec();
    }

    // Query 1: Save specific hours for a date (partial day block)
    async blockHours(data: { date: string; hoursBlocked: string[]; isBlockedByAdmin: boolean }): Promise<BlockedHours> {
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
    async blockDay(data: { date: string; isBlockedByAdmin: boolean }): Promise<BlockedHours> {
        const { date, isBlockedByAdmin } = data;
        const existing = await this.findByDate(date);
        if (existing) {
            existing.hoursBlocked = []; // Clear hours as whole day is blocked
            existing.isAllDayBlocked = true;
            existing.isBlockedByAdmin = isBlockedByAdmin;
            return existing.save();
        } else {
            return this.create({
                date,
                hoursBlocked: [],
                isAllDayBlocked: true,
                isBlockedByAdmin,
            });
        }
    }

    // Query 3: Bulk block multiple dates (each as a full-day block)
    async bulkBlock(data: { dates: string[]; isBlockedByAdmin: boolean }): Promise<BlockedHours[]> {
        const { dates, isBlockedByAdmin } = data;
        const blockedDates: BlockedHours[] = [];

        // For each date, block the whole day (using blockDay logic)
        for (const date of dates) {
            const record = await this.blockDay({ date, isBlockedByAdmin });
            blockedDates.push(record);
        }
        return blockedDates;
    }
}
