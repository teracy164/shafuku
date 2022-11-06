import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Task } from './task.entity';

@Table({ timestamps: true, underscored: true })
export class TaskStatus extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty()
  @ForeignKey(() => Task)
  @Column
  taskId: number;

  @ApiProperty()
  @Column
  status: number;
}
