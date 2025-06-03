import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PhonesService } from '../phones/phones.service';
import { LoginDto } from './dto/login.dto.';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly phonesService: PhonesService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const candidate = await this.phonesService.create(loginDto);

    return await this.generateAccessToken(candidate.phoneId);
  }

  private async generateAccessToken(sub: string): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      { sub },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '90d' },
    );

    return accessToken;
  }
}
