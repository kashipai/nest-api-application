import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
})
export class PostsModule {}
