// import {Controller, Post, Body, HttpCode, UnauthorizedException} from '@nestjs/common';
// import { AuthService } from './auth.service';
// import {AuthPayloadDto} from './dto/auth.dto';  // Assuming you have a DTO for the login data
// // import { JwtAuthGuard } from './jwt-auth.guard';  // Optional: Use this guard for routes that need JWT protection
//
// @Controller('auth')  // Base route: /auth
// export class AuthController {
//     constructor(private readonly authService: AuthService) {}
//
//     // Endpoint for logging in and receiving a JWT token
//     @Post('login')
//     @HttpCode(200)
//     async login(@Body() authPayload: AuthPayloadDto) {
//         const admin = await this.authService.validateUser(
//             authPayload.username,
//             authPayload.password,
//         );
//
//         if (!admin) {
//             throw new UnauthorizedException('Invalid credentials');
//         }
//
//         // Now that we have the user object, we can use the user.id (which should be a string)
//         return this.authService.generateToken("admin.id");
//     }
//
// }
