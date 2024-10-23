import { Body, Controller, Get, Logger, Post, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/users/models/User.model';
import { Response, response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { GqlAuthGuard } from './guards/gql.guard';
import { UserIDdeco } from './guards/UserId.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @UseGuards(AuthGuard)
    @Post('login')
    async login(@Body() body : {email:string, password:string}, @Res({passthrough:true}) response : Response) {
        await this.authService.login(body.email, response);
    }

    @UseGuards(GqlAuthGuard)
    @Post('')
    async checkAuth(): Promise<boolean> {
        return true;
    }

    @UseGuards(GqlAuthGuard)
    @Get('hello')
    getHello(@UserIDdeco() userId:string) : string {
        return "Hello"+userId;
    }
}
