import {
  Get,
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Todo } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateTodoDto, TodoDto } from './dto';

@Controller('todos')
@ApiTags('todos')
export class TodosController {
  constructor(
    @Inject(forwardRef(() => TodosService))
    private readonly todoService: TodosService,
  ) {}

  @Get()
  @ApiOkResponse({ type: [TodoDto] })
  findAll(): Promise<TodoDto[]> {
    return this.todoService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ type: Todo })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTodoDto: CreateTodoDto, @Req() request): Promise<Todo> {
    return this.todoService.createTodo(request.user.id, createTodoDto);
  }
}
