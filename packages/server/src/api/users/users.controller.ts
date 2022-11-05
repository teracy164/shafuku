import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateUserDto } from './dto/create.dto';
import { UpdateUserDto } from './dto/update.dto';
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

  @Post()
  @ApiOperation({ summary: 'ユーザー追加' })
  @ApiResponse({ type: User })
  addUser(@Body() dto: CreateUserDto) {
    return this.service.add(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ユーザー編集' })
  @ApiResponse({ type: User })
  updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.service.update(id, dto);
  }
}
