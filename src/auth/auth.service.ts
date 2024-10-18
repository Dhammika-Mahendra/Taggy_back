import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/users/models/User.model';

export interface TokenPayload {
   userId: string;     
}

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService){}

    async login(user: User, response: Response) {
        const tokenPayLoad: TokenPayload = {userId: user._id};

        const expire = new Date();
        expire.setTime(expire.getTime() + this.configService.get<number>('JWT_EXPIRATION')*1000);

        const token = this.jwtService.sign(tokenPayLoad);

        response.cookie('Authentication', token, {
            httpOnly: true,
            expires: expire
        });
    }

}
