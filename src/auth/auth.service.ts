import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

export interface TokenPayload {
   email: string;     
}

@Injectable()
export class AuthService {
    constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService){}

    async login(email :string, response: Response) {
        const tokenPayLoad: TokenPayload = {email: email};

        const expire = new Date();
        expire.setTime(expire.getTime() + this.configService.get<number>('JWT_EXPIRATION')*1000);

        const token = this.jwtService.sign(tokenPayLoad);

        response.send({ taggy_token: token});
    }

}
