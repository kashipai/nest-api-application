import {
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Length,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from './../users/user.entity';

export class Todo extends Model<Todo> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id',
  })
  userId: string;

  @Length({
    min: 3,
    max: 60,
    msg: `The length of post title can't be shorter than 3 and longer than 60 `,
  })
  @Column
  label: string;

  @Length({
    min: 3,
    max: 180,
    msg: `The length of post title can't be shorter than 3 and longer than 60 `,
  })
  @Column
  description: string;
  @Column
  isDone: boolean;
  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
  @BelongsTo(() => User)
  user: User;
}
