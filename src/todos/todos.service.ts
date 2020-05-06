import { Injectable, Inject } from '@nestjs/common';
import { Todo } from './todo.entity';
import { CreateTodoDto, TodoDto } from './dto';
import { User } from './../users';

@Injectable()
export class TodosService {
  constructor(
    @Inject('TodosRepository') private readonly todosRepository: typeof Todo,
  ) {}

  async findAll() {
    const todos = await this.todosRepository.findAll<Todo>({
      include: [User],
    });

    return todos.map(todo => new TodoDto(todo));
  }

  async createTodo(userId: string, createTodoDto: CreateTodoDto) {
    const todo: Todo = new Todo();
    todo.userId = userId;
    todo.label = createTodoDto.label;
    todo.description = createTodoDto.description;
    todo.isDone = createTodoDto.isDone;

    return todo.save();
  }
}
