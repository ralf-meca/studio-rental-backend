import {IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    startingHour: string;

    @IsString()
    @IsNotEmpty()
    endingHour: string;

    @IsString()
    selectedLights: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    number: string;

    @IsString()
    @IsNotEmpty()
    idPhoto: string; // Will store the file path

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    doorCode?: string;

    @IsString()
    blockedHours: string;

    @IsNumber()
    totalPrice: number;
}
