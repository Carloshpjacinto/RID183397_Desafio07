import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
//import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  //findAll() {
  //return `This action returns all users`;
  //}

  //findOne(id: number) {
  //return `This action returns a #${id} user`;
  //}

  //update(id: number, updateUserDto: UpdateUserDto) {
  //return `This action updates a #${id} user`;
  //}

  //remove(id: number) {
  //return `This action removes a #${id} user`;
  //}
}
