import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Get,
  Delete,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthGuard } from '../guards/Auth.guard';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { DeleteUserService } from 'src/modules/users/services/DeleteUser.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard)
  @Get('profile')
  ProfileUser(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }
  @HttpCode(HttpStatus.OK)
  //@UseGuards(UserMatchGuard)
  @Delete(':id')
  deleteUser(@ParamId() id: number) {
    return this.deleteUserService.execute(id);
  }
}
