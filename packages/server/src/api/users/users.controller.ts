import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'users' })
export class UsersContoller {
  constructor(private service: UsersService) {}

  @Get()
  @ApiOperation({ summary: '全ユーザー取得' })
  @ApiResponse({ type: [User] })
  getUsers() {
    return this.service.findAll();
  }
}
