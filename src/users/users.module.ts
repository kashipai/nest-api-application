import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from './../database';
import { usersProviders } from './user.provider';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
