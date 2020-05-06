import { Module, forwardRef } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { todosProvider } from './todos.provider';
import { TodosService } from './todos.service';
import { DatabaseModule } from './../database';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  controllers: [TodosController],
  providers: [TodosService, ...todosProvider],
  exports: [],
})
export class TodosModule {}
