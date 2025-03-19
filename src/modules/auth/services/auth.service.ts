import { Injectable } from '@nestjs/common';
import { FindUserUsernameService } from 'src/modules/users/services/FindUserUsername.service';
//import { AuthLoginDTO } from '../dto/authLogin.dto';
import { FindUserEmailService } from 'src/modules/users/services/FindUserEmail.service';
//import { AuthLoginDTO } from '../dto/authLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private findUserUsernameService: FindUserUsernameService,
    private readonly findUserEmailService: FindUserEmailService,
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
