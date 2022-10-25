import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test' })
  username: string;
  @ApiProperty({ example: 'test' })
  password: string;
}
