import { Injectable, Inject } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto';

@Injectable()
export class TodosService {
  constructor(
    @Inject('TodosRepository') private readonly todosRepository: typeof Todo,
  ) {}

  async createTodo(userId: string, createTodoDto: CreateTodoDto) {
    const todo: Todo = new Todo();
    todo.userId = userId;
    todo.label = createTodoDto.label;
    todo.description = createTodoDto.description;
    todo.isDone = createTodoDto.isDone;

    return todo.save();
  }
}
