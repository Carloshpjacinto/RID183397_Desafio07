import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserService } from './services/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }

  //@Get()
  //findAll() {
  //return this.usersService.findAll();
  //}

  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //return this.usersService.findOne(+id);
  //}

  //@Patch(':id')
  //update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //return this.usersService.update(+id, updateUserDto);
  //}

  //@Delete(':id')
  //remove(@Param('id') id: string) {
  //return this.usersService.remove(+id);
  //}
}
