import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT_CONFIG, JWT_COOKIE_KEY } from './jwt.constant';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: JWT_CONFIG.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies[JWT_COOKIE_KEY]]),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
