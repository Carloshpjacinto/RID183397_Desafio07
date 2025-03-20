import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/createUser.dto';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/shared/utils/hashPassword';

type User = {
  name: string;
  username: string;
  email: string;
};

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(createUserDto: CreateUserDto): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    createUserDto.password = await hashPassword(createUserDto.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = createUserDto;

    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);

    return result;
  }
}
