import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AvailabilityDocument = Availability & Document;

@Schema()
export class Availability {
    @Prop({ required: true })
    date: string; // Store the date as a string or use Date type

    @Prop({ required: true, type: [String] })
    availableHours: string[]; // Array of available hours (e.g., ["10:00", "12:00"])

    @Prop({ required: true })
    isBooked: boolean; // Boolean to check if the slot is booked
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
