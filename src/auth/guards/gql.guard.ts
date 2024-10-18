import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
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

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;  // Get the request object

    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token not found');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      Logger.log(payload);
      const user = await this.usersService.validateUserByEmail(payload['email']);

      if (!user) {
        throw new UnauthorizedException('Invalid User');
      }

    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    // If everything is valid, allow the request to proceed
    return true;
  }

  // Helper function to extract token from the request cookies
  private extractTokenFromRequest(request: any): string | null {
    const token = request.cookies['Authentication'];  // Assuming the cookie is named 'Authentication'
    return token ? token : null;  
  }
}
