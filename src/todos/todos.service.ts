import { Injectable, Inject } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @Inject('TodosRepository') private readonly todosRepository: typeof Todo,
  ) {}

  createTodo() {}
}
