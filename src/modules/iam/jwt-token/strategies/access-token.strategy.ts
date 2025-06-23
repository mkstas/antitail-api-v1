import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload, JwtRequest } from '../interfaces/jwt-token.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: JwtRequest): string => req.cookies.accessToken,
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET') ?? 'jwt-access-secret',
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
