import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './user.provider';
import { UsersService } from './users.service';
import { JwtStrategy } from './auth/jwt-strategy';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
