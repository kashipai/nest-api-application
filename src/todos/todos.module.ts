import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { todosProvider } from './todos.provider';
import { TodosService } from './todos.service';
import { DatabaseModule } from './../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodosController],
  providers: [TodosService, ...todosProvider],
})
export class TodosModule {}
