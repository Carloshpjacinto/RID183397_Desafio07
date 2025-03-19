import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
//import { AuthLoginDTO } from '../dto/authLogin.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }
}
