import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {AvailabilityService} from "./availability.service";
import {Availability} from "./schemas/availability.schema";

/**
 * Returns the availability of the studio (dates and hours)
 */
@Controller('api/availability')
export class AvailabilityController {
    constructor(private readonly availabilityService: AvailabilityService) {}
    @Get()
    getText(): string {
        return 'Available!';  // Your response text
    }
    @Post()
    async create(@Body() data: Partial<Availability>): Promise<Availability> {
        return this.availabilityService.create(data);
    }

    @Get()
    async findAll(): Promise<Availability[]> {
        return this.availabilityService.findAll();
    }

    @Get(':date')
    async findByDate(@Param('date') date: string): Promise<Availability | null> {
        return this.availabilityService.findByDate(date);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<Availability>): Promise<Availability | null> {
            return this.availabilityService.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Availability | null> {
        return this.availabilityService.delete(id);
    }
}
