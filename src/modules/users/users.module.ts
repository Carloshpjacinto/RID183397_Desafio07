import { Module } from '@nestjs/common';
import { CreateUserService } from './services/users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/data-source.module';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, CreateUserService],
})
export class UsersModule {}
