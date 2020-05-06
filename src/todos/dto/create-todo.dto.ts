import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly label: string;
  @IsOptional()
  @ApiProperty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @ApiProperty()
  @IsBoolean()
  readonly isDone: boolean;
}
