import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Rental, RentalSchema } from './schemas/rentals.schema';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: Rental.name, schema: RentalSchema }])],
    controllers: [RentalsController],
    providers: [RentalsService],
    exports: [RentalsService],
})
export class RentalsModule {}
