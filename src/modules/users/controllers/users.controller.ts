import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserService } from '../services/CreateUser.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { FindUserAllService } from '../services/FindUserAll.service';
import { FindUserIdService } from '../services/FindUserId.service';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UpdateUserService } from '../services/UpdateUser.service';
import { DeleteUserService } from '../services/DeleteUser.service';
import { UserMatchGuard } from 'src/shared/guards/userMatch.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly findUserAllService: FindUserAllService,
    private readonly findUserIdService: FindUserIdService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }

  @Get()
  findAll() {
    return this.findUserAllService.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findUserIdService.execute(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserService.execute(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(UserMatchGuard)
  remove(@Param('id') id: number) {
    return this.deleteUserService.execute(id);
  }
}
