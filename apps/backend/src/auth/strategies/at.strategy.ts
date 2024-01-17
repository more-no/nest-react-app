import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// access token strategy
@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(/*config: ConfigService*/) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'AT_SECRET',
    });
  }

  validate(payload: any) {
    return payload;
  }
}
