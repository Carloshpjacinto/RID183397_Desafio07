import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FindUserUsernameService } from 'src/modules/users/services/FindUserUsername.service';
import { ValidateTokenDTO } from '../dto/validateToken.dto';
import { jwtSecretConstants } from '../constants/jwtSecret.constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserUsernameService: FindUserUsernameService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findUserUsernameService.execute(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, id, ...result } = user;

      const payload = { sub: id, username: username, email: user.email };

      const token = { access_token: await this.jwtService.signAsync(payload) };

      return { ...result, token };
    }

    return null;
  }

  async validateToken(token: string): Promise<ValidateTokenDTO> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: jwtSecretConstants.secret,
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { valid: true, decoded };
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      return { valid: false, message: error.message };
    }
  }
}
