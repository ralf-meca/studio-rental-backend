import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {BlockedHours, BlockedHoursDocument} from './schemas/blockedHours.schema';
import { BlockedHoursService } from './blockedHours.service';

@Controller('api/blocked-hours')
export class BlockedHoursController {
    constructor(private readonly blockedHoursService: BlockedHoursService) {}

    // Query 1: Block specific hours for a date
    @Post('/hours')
    async blockHours(
        @Body() data: { date: string; hoursBlocked: string[]; isBlockedByAdmin: boolean }
    ): Promise<BlockedHours> {
        return this.blockedHoursService.blockHours(data);
    }

    // Query 2: Block the entire day
    @Post('/day')
    async blockDay(
        @Body() data: { date: string; isBlockedByAdmin: boolean }
    ): Promise<BlockedHours> {
        return this.blockedHoursService.blockDay(data);
    }

    // Query 3: Bulk block an array of dates (full-day block)
    @Post('/bulk')
    async bulkBlock(
        @Body() data: { dates: string[]; isBlockedByAdmin: boolean }
    ): Promise<BlockedHours[]> {
        return this.blockedHoursService.bulkBlock(data);
    }

    // Other standard CRUD endpoints
    @Get()
    async findAll(): Promise<BlockedHours[]> {
        return this.blockedHoursService.findAll();
    }

    @Get(':date')
    async findByDate(date: string): Promise<BlockedHoursDocument | null> {
        return this.blockedHoursService.findByDate(date);
    }
    @Get('/month/:month')
    async findByMonth(@Param('month') month: string): Promise<BlockedHoursDocument[]> {
        return this.blockedHoursService.findByMonth(month);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() data: Partial<BlockedHours>
    ): Promise<BlockedHours | null> {
        return this.blockedHoursService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<BlockedHours | null> {
        return this.blockedHoursService.delete(id);
    }
}
