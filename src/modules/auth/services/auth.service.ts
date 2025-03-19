import { Injectable } from '@nestjs/common';
import { FindUserUsernameService } from 'src/modules/users/services/FindUserUsername.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly findUserUsernameService: FindUserUsernameService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findUserUsernameService.execute(username);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
