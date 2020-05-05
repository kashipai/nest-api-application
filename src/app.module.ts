import { Module } from '@nestjs/common';
import { UsersModule } from './users';
import { SharedModule } from './shared';
import { PostsModule } from './posts';

@Module({
  imports: [UsersModule, PostsModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
