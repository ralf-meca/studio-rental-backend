import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service'; // We'll create this next

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService, private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: { username: string; password: string }) {
        return this.adminService.createAdmin(body.username, body.password);
    }

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        const admin = await this.adminService.findByUsername(body.username);
        if (!admin) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await this.authService.validateUser(body.password, admin.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        return this.authService.generateToken(admin.id);
    }
}
