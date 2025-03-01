import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {AuthPayloadDto} from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async validateUser({username, password}: AuthPayloadDto): Promise<boolean> {
        // const user = await this.usersService.findOne(username);

        return bcrypt.compare(password, storedPassword);
    }

    async generateToken(userId: string) {
        return this.jwtService.sign({ userId });
    }
}
