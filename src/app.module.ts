import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/config.module';

@Module( {
  imports: [ UsersModule, SharedModule ],
  controllers: [],
  providers: [],
} )
export class AppModule { }
