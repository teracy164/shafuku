import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { AuthUtil } from 'src/utils/auth';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entity/user.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const user = await this.usersService.findOneByUsernameForAuth(dto.username);
    if (user) {
      console.log('find user!!!');
      const hash = AuthUtil.createHash(dto.password, user.salt);
      console.log('create hash', hash);
      if (user.password === hash) {
        console.log('password matched.');
        return this.createToken(user);
      } else {
        this.logger.warn('password not match.');
      }
    } else {
      this.logger.warn('user not found.');
    }
    throw new BadRequestException();
  }

  async authorize(userId: number) {
    const user = await this.usersService.findOne(userId);
    const token = this.createToken(user);

    delete user.salt;
    delete user.password;

    return { user, token };
  }

  private createToken(user: User) {
    const payload = { userId: user.id, name: user.name };
    return this.jwtService.sign(payload);
  }
}
