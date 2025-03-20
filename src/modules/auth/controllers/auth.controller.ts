import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Get,
  Delete,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/shared/guards/localAuth.guard';
//import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { DeleteUserService } from 'src/modules/users/services/DeleteUser.service';
import { CreateUserService } from 'src/modules/users/services/CreateUser.service';
import { AuthRegisterDTO } from '../dto/authRegister.dto';
import { UserMatchGuard } from 'src/shared/guards/userMatch.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly deleteUserService: DeleteUserService,
    private readonly createUserService: CreateUserService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  registerUser(@Body() body: AuthRegisterDTO) {
    return this.createUserService.execute(body);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  //@UseGuards(AuthGuard)
  @Get('profile')
  profileUser(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UserMatchGuard)
  @Delete('delete/:id')
  deleteUser(@ParamId() id: number) {
    return this.deleteUserService.execute(id);
  }
}
