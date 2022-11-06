import { BelongsToMany, Column, DefaultScope, HasOne, Model, Table } from 'sequelize-typescript';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/api/users/entity/user.entity';
import { TaskAssign } from './task-assign.entity';
import { TaskStatus } from './task-status.entity';

@DefaultScope(() => ({
  include: [
    { model: User, required: false },
    { model: TaskStatus, required: false, order: [['updatedAt', 'desc']], as: 'lastStatus' },
  ],
}))
@Table({ timestamps: true, underscored: true })
export class Task extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty()
  @Column
  title: string;

  @ApiProperty()
  @Column
  contents: string;

  @ApiProperty()
  @Column
  rewards: number;

  @ApiProperty()
  @Column
  orderer: string;

  @ApiPropertyOptional()
  @Column
  startDate?: string;

  @ApiProperty()
  @Column
  endDate: string;

  @ApiProperty()
  @Column
  numOfRecruit: number;

  @Column({ defaultValue: false })
  isDelete: boolean;

  @ApiPropertyOptional({ type: TaskStatus })
  @HasOne(() => TaskStatus, { as: 'lastStatus' })
  lastStatus?: TaskStatus;

  @ApiPropertyOptional({ type: [User] })
  @BelongsToMany(() => User, () => TaskAssign)
  assigners?: User[];
}
