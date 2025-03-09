import {Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException, Get, Param} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/reservation.dto';
import {Query} from "mongoose";
import {Reservation} from "./reservation.entity";

@Controller('/api/reservations')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('idPhoto', {
            storage: diskStorage({
                destination: './uploads/reservations',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, uniqueSuffix + extname(file.originalname));
                },
            }),
        }),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createReservationDto: CreateReservationDto,
    ) {
        if (!file) {
            throw new BadRequestException('File (idPhoto) not provided');
        }
        const reservationData = { ...createReservationDto, idPhoto: file.path }; // Save file path
        return this.reservationService.create(reservationData);
    }

    @Get('month/:yearMonth')
    async getReservationsByMonth(@Param('yearMonth') yearMonth: string) {
        return this.reservationService.getReservationsByMonth(yearMonth);
    }
}
