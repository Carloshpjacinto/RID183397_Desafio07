import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserUsernameService } from 'src/modules/users/services/FindUserUsername.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserUsernameService: FindUserUsernameService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findUserUsernameService.execute(username);

    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, id, ...result } = user;

      const payload = { sub: id, username: username, email: user.email };

      const token = { access_token: await this.jwtService.signAsync(payload) };

      return { ...result, token };
    }

    return null;
  }
}
