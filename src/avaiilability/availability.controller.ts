import { Controller, Get } from '@nestjs/common';

/**
 * Returns the availability of the studio (dates and hours)
 */
@Controller('api')
export class AvailabilityController {
    @Get('availability')
    getText(): string {
        return 'Available!';  // Your response text
    }
}
