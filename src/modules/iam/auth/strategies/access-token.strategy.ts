import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtRequest } from 'src/common/utils/jwt-cookies';

export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: JwtRequest): string => req.cookies.accessToken,
      ]),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
