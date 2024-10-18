import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
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
    // Switch the context to GraphQL
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;  // Get the request object

    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token not found');
    }

    try {
      // Verify the token
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      // Retrieve the user based on the payload (userId from token)
      const user = await this.usersService.getUser({ _id: payload.userId });

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Attach the user to the request context
      request.user = user;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }

    // If everything is valid, allow the request to proceed
    return true;
  }

  // Helper function to extract token from the request headers
  private extractTokenFromRequest(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];  // Extract token after "Bearer"
    }
    return null;
  }
}
