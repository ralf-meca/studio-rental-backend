import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
        private jwtService: JwtService,
    ) {}

    async createAdmin(username: string, password: string) {
        const admin = new this.adminModel({ username, password });
        return admin.save();
    }

    async validateAdmin(username: string, password: string): Promise<string | null> {
        const admin = await this.adminModel.findOne({ username, password });
        if (!admin) return null;
        return this.jwtService.sign({ id: admin._id, username: admin.username });
    }
}
