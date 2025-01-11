import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserModelModule } from 'src/database/models/users/user-model.module';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    LocalStrategy,
  ],
  imports: [UserModelModule]
})
export class UsersModule {}
