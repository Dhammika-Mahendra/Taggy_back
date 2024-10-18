import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './guards/auth.guard';
import { GqlAuthGuard } from './guards/gql.guard';

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
    forwardRef(() => UsersModule)
  ],
  exports:[JwtModule],
  controllers: [AuthController],
  providers: [AuthService,AuthGuard,GqlAuthGuard]
})
export class AuthModule {}
