import { Body, Controller, Get, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/users/models/User.model';
import { Response, response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(AuthGuard)
    @Post('login')
    async login(@Body() user: User, @Res({passthrough:true}) response : Response) {
        await this.authService.login(user, response);
        response.send(user);
    }

    @Get('log')
    getHello(): string {
        return 'Hello World!';
    }
}
