import { Body, Controller, Get, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/users/models/User.model';
import { Response, response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { GqlAuthGuard } from './guards/gql.guard';
import { UserIDdeco } from './guards/UserId.decorator';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(AuthGuard)
    @Post('login')
    async login(@Body() body : {email:string, password:string}, @Res({passthrough:true}) response : Response) {
        await this.authService.login(body.email, response);
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    async checkAuth(): Promise<boolean> {
        return true;
    }

    @UseGuards(JwtAuthGuard)
    @Get('hello')
    getHello(@UserIDdeco() userId:string) : string {
        return "Hello"+userId;
    }
}
