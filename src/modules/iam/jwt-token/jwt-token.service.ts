import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(sub: string): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      { sub },
      { secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'), expiresIn: '90d' },
    );

    return accessToken;
  }

  setCookieWithToken(res: Response, name: string, token: string, maxAge: number): void {
    res.cookie(name, token, { httpOnly: true, secure: false, maxAge });
  }
}
