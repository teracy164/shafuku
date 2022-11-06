import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchTaskDto {
  @ApiPropertyOptional()
  userId?: number;
  @ApiPropertyOptional()
  keyword?: string;
  @ApiPropertyOptional()
  orderer?: string;
}
