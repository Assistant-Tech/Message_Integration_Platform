import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      usernameField: 'email',
      passwordField: 'password'
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // Implement your authentication logic here
    // For example, you can use a service to validate the user's credentials
    // and return the user object if the credentials are valid
    // Otherwise, throw an UnauthorizedException
  }
}
