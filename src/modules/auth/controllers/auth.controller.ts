import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
//import { AuthLoginDTO } from '../dto/authLogin.dto';
import { LocalAuthGuard } from '../guards/localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  create(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }
}
