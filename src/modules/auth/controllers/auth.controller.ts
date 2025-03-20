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
  Patch,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/shared/guards/localAuth.guard';
import { ParamId } from 'src/shared/decorators/paramId.decorator';
import { DeleteUserService } from 'src/modules/users/services/DeleteUser.service';
import { CreateUserService } from 'src/modules/users/services/CreateUser.service';
import { AuthRegisterDTO } from '../dto/authRegister.dto';
import { UserMatchGuard } from 'src/shared/guards/userMatch.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AuthUpdateUserDTO } from '../dto/authUpdateUser.dto';
import { UpdateUserService } from 'src/modules/users/services/UpdateUser.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly deleteUserService: DeleteUserService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  registerUser(@Body() body: AuthRegisterDTO) {
    return this.createUserService.execute(body);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  loginUser(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return req.user;
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AuthGuard)
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

  @HttpCode(HttpStatus.OK)
  @UseGuards(UserMatchGuard)
  @Patch('user/:id')
  patchUser(@ParamId() id: number, @Body() body: AuthUpdateUserDTO) {
    return this.updateUserService.execute(id, body);
  }
}
