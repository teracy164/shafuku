import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, DefaultScope, Model, Scopes, Table } from 'sequelize-typescript';

export enum UserScope {
  AUTH = 'auth',
}
@Scopes(() => ({
  [UserScope.AUTH]: {
    attributes: {
      exclude: [],
    },
    where: {
      isDelete: false,
    },
  },
}))
@DefaultScope(() => ({
  attributes: {
    exclude: ['salt', 'password'],
  },
  where: {
    isDelete: false,
  },
}))
@Table({ timestamps: true, underscored: true, indexes: [{ fields: ['username'], unique: true }] })
export class User extends Model {
  @ApiPropertyOptional()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty()
  @Column
  name: string;

  @Column
  username: string;

  @Column
  salt: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  isDelete: boolean;
}
