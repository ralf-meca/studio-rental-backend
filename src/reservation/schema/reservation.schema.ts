import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Reservation extends Document {
    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    startingHour: string;

    @Prop({ required: true })
    endingHour: string;

    @Prop({ type: Array, default: [] })
    selectedLights: { id: string; name: string; quantity: number; price: number }[];

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    number: string;

    @Prop({ required: true })
    idPhoto: string; // Store file path

    @Prop({ default: 'pending' })
    status: string;

    @Prop()
    doorCode?: string; // Optional
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
