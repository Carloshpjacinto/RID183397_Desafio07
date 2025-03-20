import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class FindUserUsernameService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });

    if (!user) throw new Error(`User ${username} not found`);

    return user;
  }
}
