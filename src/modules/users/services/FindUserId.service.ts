import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class FindUserIdService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) throw new Error(`User ${id} not found`);

    return user;
  }
}
