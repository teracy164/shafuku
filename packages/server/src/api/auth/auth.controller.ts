import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { User } from '../users/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JWT_COOKIE_KEY } from './jwt/jwt.constant';

@Controller({ path: 'auth' })
export class AuthContoller {
  constructor(private service: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'ログイン' })
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const token = await this.service.login(dto);
    response.cookie(JWT_COOKIE_KEY, token);
  }

  @Post('logout')
  @ApiOperation({ summary: 'ログアウト' })
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie(JWT_COOKIE_KEY, null);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiOperation({ summary: '認証' })
  @ApiResponse({ type: User })
  async authorize(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    const { user, token } = await this.service.authorize((req.user as any).userId);
    response.cookie(JWT_COOKIE_KEY, token);
    return user;
  }
}
