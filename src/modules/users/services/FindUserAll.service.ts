import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class FindUserAllService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}
  async execute(): Promise<any[]> {
    const user = await this.userRepository.find();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return user.map(({ password, ...result }) => result);
  }
}
