import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MoviesModule } from './movies/movies.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UsersModule, PostsModule, MoviesModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
