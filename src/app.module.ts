import { Module } from '@nestjs/common';
import { UsersModule } from './users';
import { SharedModule } from './shared';
import { PostsModule } from './posts';
import { TodosModule } from './todos';

@Module({
  imports: [UsersModule, PostsModule, TodosModule, SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
