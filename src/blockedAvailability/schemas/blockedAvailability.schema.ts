import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlockedAvailabilityDocument = BlockedAvailability & Document;


@Schema()
export class BlockedAvailability {
    @Prop({ required: true, unique: true })
    date: string; // Unique identifier for the day

    @Prop({ required: false, type: [String] })
    hoursBlocked: string[]; // Array of hours, e.g., ['09:00', '10:00'] - can be empty for a full-day block

    @Prop({ default: false })
    isAllDayBlocked: boolean;

    @Prop({ default: false })
    isBlockedByAdmin: boolean;
}

export const BlockedAvailabilitySchema = SchemaFactory.createForClass(BlockedAvailability);
