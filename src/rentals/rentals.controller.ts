import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {RentalsService} from './rentals.service';
import {Rental} from './schemas/rentals.schema';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";
import {extname} from "path";
import * as fs from "fs";

@Controller('/api/rentals')
export class RentalsController {
    constructor(private readonly rentalService: RentalsService) {
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('img', {
            storage: diskStorage({
                destination: './uploads/rentals',
                filename: (req, file, cb) => {
                    const rentalName = req.body.name;  // Get the name from the request body
                    const fileExtension = extname(file.originalname);  // Get the file extension
                    cb(null, `${rentalName}${fileExtension}`);  // Combine the name with the extension
                },
            }),
        }),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() rentalData: Partial<Rental>,
    ): Promise<Rental> {
        if (!file) {
            throw new BadRequestException('File (img) not provided');
        }
        const rentalWithImage = {...rentalData, img: file.path};
        console.log('file', file)
        return this.rentalService.create(rentalWithImage);
    }

    @Get()
    async findAll(): Promise<Rental[]> {
        return this.rentalService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Rental | null> {
        return this.rentalService.findById(id);
    }

    @Put(':id')
    @UseInterceptors(
        FileInterceptor('img', {
            storage: diskStorage({
                destination: './uploads/rentals',
                filename: (req, file, cb) => {
                    const rentalName = req.body.name;
                    const fileExtension = extname(file.originalname);
                    cb(null, `${rentalName}${fileExtension}`);
                },
            }),
        }),
    )
    async update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() rentalData: Partial<Rental>,
    ): Promise<Rental | null> {
        const existingRental = await this.rentalService.findById(id);
        if (!existingRental) {
            throw new BadRequestException('Rental not found');
        }

        // CASE 1: New image uploaded
        if (file) {
            rentalData.img = `/uploads/rentals/${file.filename}`;
        }

        // CASE 2: No new image, but name has changed, so we have to change the name of the image
        if (!file && rentalData.name && existingRental.img) {
            const oldImagePath = path.resolve('uploads/rentals', path.basename(existingRental.img));
            const oldExtension = extname(existingRental.img);
            const newFilename = `${rentalData.name}${oldExtension}`;
            const newImagePath = path.resolve('uploads/rentals', newFilename);

            if (fs.existsSync(oldImagePath)) {
                fs.renameSync(oldImagePath, newImagePath);
                rentalData.img = `/uploads/rentals/${newFilename}`;
            }
        }

        return this.rentalService.update(id, rentalData);
    }


    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Rental | null> {
        return this.rentalService.delete(id);
    }
}
