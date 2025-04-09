import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RentalDocument = Rental & Document;

@Schema()
export class Rental {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    status: string;

    @Prop()
    img: string;
}

export const RentalSchema = SchemaFactory.createForClass(Rental);
