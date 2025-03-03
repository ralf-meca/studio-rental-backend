import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('api/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('/register')
    async register(@Body() body: { username: string; password: string }) {
        return this.adminService.createAdmin(body.username, body.password);
    }

    @Post('/login')
    async login(@Body() body: { username: string; password: string }) {
        const token = await this.adminService.validateAdmin(body.username, body.password);
        if (!token) throw new UnauthorizedException('Invalid credentials');
        return { token };
    }
}
