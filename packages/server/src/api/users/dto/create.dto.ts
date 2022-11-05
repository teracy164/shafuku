import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entity/user.entity';

export class CreateUserDto {
  @ApiProperty({ type: User })
  user: User;
  @ApiProperty()
  password: string;
}
