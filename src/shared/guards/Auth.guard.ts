import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/services/auth.service';
import { FindUserIdService } from 'src/modules/users/services/FindUserId.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly findUserIdService: FindUserIdService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const { authorization } = request.headers;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (!authorization || !authorization.startsWith('Bearer '))
      throw new UnauthorizedException('Invalid token');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const token = authorization.split(' ')[1];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { valid, decoded } = await this.authService.validateToken(token);

    if (!valid || !decoded) throw new UnauthorizedException('Invalid token');

    const user = await this.findUserIdService.execute(Number(decoded.sub));

    if (!user) return false;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (request.params.id != user.id) return false;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    request.user = result;

    return true;
  }
}
