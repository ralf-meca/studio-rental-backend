import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Admin } from './schemas/admin.schema';

@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

    async createAdmin(username: string, password: string): Promise<Admin> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.adminModel.create({ username, password: hashedPassword });
    }

    async findByUsername(username: string): Promise<Admin | null> {
        return this.adminModel.findOne({ username }).exec();
    }
}
