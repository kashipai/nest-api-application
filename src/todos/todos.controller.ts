import { Controller, Post, UseGuards, Req, Body, forwardRef, Inject } from '@nestjs/common';
import { TodosService } from './todos.service';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Todo } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto } from './dto';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(@Inject(forwardRef(()=>TodosService))private readonly todoService: TodosService) {}

  @Post()
  @ApiCreatedResponse({ type: Todo })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTodoDto: CreateTodoDto, @Req() request): Promise<Todo> {
    return this.todoService.createTodo(request.user.id, createTodoDto);
  }
}
