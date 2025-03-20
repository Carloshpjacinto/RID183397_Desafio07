import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
//import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) throw new Error('User not found');

    await this.userRepository.delete(id);
    return JSON.stringify(`Usuario ${id} excluido`);
  }
}
