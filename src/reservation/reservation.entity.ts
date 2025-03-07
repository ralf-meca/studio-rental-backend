import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    number: string;

    @Prop({ required: true })
    isConditionsAccepted: boolean;

    @Prop({ required: true })
    startingHour: string;

    @Prop({ required: true })
    endingHour: string;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    currentMonth: string;

    @Prop({ required: true })
    doorCode: string;

    @Prop()
    idPhoto: string; // The URL to the uploaded photo
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
