import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import {BlockedAvailability, BlockedAvailabilityDocument} from './schemas/blockedAvailability.schema';
import { BlockedAvailabilityService } from './blockedAvailability.service';

@Controller('api/blocked-availability')
export class BlockedAvailabilityController {
    constructor(private readonly blockedAvailabilityService: BlockedAvailabilityService) {}

    // Query 1: Block specific hours for a date
    @Post('/hours')
    async blockHours(
        @Body() data: { date: string; hoursBlocked: string[]; isBlockedByAdmin: boolean }
    ): Promise<BlockedAvailability> {
        return this.blockedAvailabilityService.blockHours(data);
    }

    // Query 2: Block the entire day
    @Put('block-day/:date')
    async blockWholeDay(
        @Param('date') date: string,
        @Body() { isBlocked }: { isBlocked: boolean }
    ) {
        return this.blockedAvailabilityService.toggleAllDayBlock(date, isBlocked);
    }
    // Query 3: Bulk block an array of dates (full-day block)
    @Post('/bulk')
    async bulkBlock(
        @Body() data: { dates: string[]; isBlockedByAdmin: boolean }
    ): Promise<BlockedAvailability[]> {
        return this.blockedAvailabilityService.bulkBlock(data);
    }

    // Other standard CRUD endpoints
    @Get()
    async findAll(): Promise<BlockedAvailability[]> {
        return this.blockedAvailabilityService.findAll();
    }

    @Get(':date')
    async findByDate(date: string): Promise<BlockedAvailabilityDocument | null> {
        return this.blockedAvailabilityService.findByDate(date);
    }
    @Get('/month/:month')
    async findByMonth(@Param('month') month: string): Promise<BlockedAvailabilityDocument[]> {
        return this.blockedAvailabilityService.findByMonth(month);
    }

    @Put('add/:date')
    async addBlockedHours(
        @Param('date') date: string,
        @Body('hoursBlocked') hoursBlocked: string[]
    ): Promise<BlockedAvailability | null> {
        return this.blockedAvailabilityService.addBlockedHours(date, hoursBlocked);
    }

    @Put('remove-blocked-hours/:date')
    async removeBlockedHours(
        @Param('date') date: string,
        @Body('hoursToUnblock') hoursToUnblock: string[],
    ): Promise<BlockedAvailability | null> {
        return this.blockedAvailabilityService.removeBlockedHours(date, hoursToUnblock);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<BlockedAvailability | null> {
        return this.blockedAvailabilityService.delete(id);
    }


}
