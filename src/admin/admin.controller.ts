import {Controller, Post, Body, UnauthorizedException, Res, HttpCode} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response } from 'express';

@Controller('api/admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('/register')
    async register(@Body() body: { username: string; password: string }) {
        return this.adminService.createAdmin(body.username, body.password);
    }

    @Post('/login')
    @HttpCode(200)
    async login(
        @Body() body: { username: string; password: string },
        @Res({ passthrough: true }) response: Response
    ) {
        const token = await this.adminService.validateAdmin(body.username, body.password);
        if (!token) throw new UnauthorizedException('Invalid credentials');

        response.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax', // or 'none' if cross-site (needs https)
            secure: true,    // only send on HTTPS
            maxAge: 0 // session-only cookie (expires when tab closes)
        });

        return { success: true };
    }

    @Post('/logout')
    logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('token');
        return { message: 'Logged out' };
    }
}
