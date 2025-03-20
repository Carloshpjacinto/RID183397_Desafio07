import { Module } from '@nestjs/common';
import { CreateUserService } from './services/CreateUser.service';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from 'src/database/data-source.module';
import { userProviders } from './user.providers';
import { FindUserAllService } from './services/FindUserAll.service';
import { FindUserIdService } from './services/FindUserId.service';
import { UpdateUserService } from './services/UpdateUser.service';
import { DeleteUserService } from './services/DeleteUser.service';
import { FindUserUsernameService } from './services/FindUserUsername.service';
import { FindUserEmailService } from './services/FindUserEmail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    CreateUserService,
    FindUserAllService,
    FindUserIdService,
    FindUserUsernameService,
    FindUserEmailService,
    UpdateUserService,
    DeleteUserService,
  ],
  exports: [
    FindUserUsernameService,
    FindUserEmailService,
    FindUserIdService,
    DeleteUserService,
    CreateUserService,
    UpdateUserService,
  ],
})
export class UsersModule {}
