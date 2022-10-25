import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/api/users/entity/user.entity';
import { Task } from './task.entity';

@Table({ timestamps: true, underscored: true })
export class TaskAssign extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty()
  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ApiPropertyOptional()
  @BelongsTo(() => Task)
  task?: Task;

  @ApiPropertyOptional()
  @BelongsTo(() => User)
  user?: User;
}
