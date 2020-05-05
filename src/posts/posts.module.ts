import { DatabaseModule } from './../database';
import { Module, forwardRef } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { postsProviders } from './posts.provider';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [PostsController],
  providers: [PostsService, ...postsProviders],
  exports: [],
})
export class PostsModule {}
