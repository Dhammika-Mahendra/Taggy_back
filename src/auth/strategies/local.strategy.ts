import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsersService } from "src/users/users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({userNameField: 'email'});
    Logger.log('Local Strategy Initialized');
  }

  async validate(email: string, password: string) {
    return this.userService.validateUser(email, password);
  }
}