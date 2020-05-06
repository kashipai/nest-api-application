import { ApiProperty } from '@nestjs/swagger';
import { Todo } from './../todo.entity';

export class TodoDto {
  @ApiProperty()
  readonly id: number;
  @ApiProperty()
  readonly userId: string;
  @ApiProperty()
  readonly label: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly isDone: boolean;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
  @ApiProperty()
  readonly deletedAt: Date;

  constructor(todo: Todo) {
    this.id = todo.id;
    this.userId = todo.userId;
    this.label = todo.label;
    this.description = todo.description;
    this.isDone = todo.isDone;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
    this.deletedAt = todo.deletedAt;
  }
}
