import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './auth.guard';

@Module({
  imports:[
    JwtModule.registerAsync(
      {
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: `${configService.get<string>('JWT_EXPIRATION')}s`},
        }),
        inject: [ConfigService],
      }),
    PassportModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,AuthGuard]
})
export class AuthModule {}
