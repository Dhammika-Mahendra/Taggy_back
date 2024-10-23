import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['authorization']?.split(' ')[1]; // Extract token from Bearer header

    if (!token) {
      throw new UnauthorizedException('Authentication token not found');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const user = await this.usersService.validateUserByEmail(payload['email']);

      if (!user) {
        throw new UnauthorizedException('Invalid User');
      }else{
        request['userID'] = user._id;
      }
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    // If everything is valid, allow the request to proceed
    return true;
  }
}
