import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProfilesService } from 'src/core/profiles/profiles.service';
import { UsersService } from 'src/core/users/users.service';
import { TokensService } from 'src/core/tokens/tokens.service';
import { JwtPayload, JwtTokens } from 'src/core/tokens/tokens.types';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
    private readonly tokensService: TokensService,
  ) {}

  async register(dto: AuthUserDto): Promise<JwtTokens> {
    const user = await this.usersService.create(dto);
    await this.profilesService.create(user.userId);
    const tokens = await this.tokensService.generateTokens({
      sub: user.userId,
      email: user.email,
    });
    return tokens;
  }

  async login(dto: AuthUserDto): Promise<JwtTokens> {
    const user = await this.usersService.findOne(dto.email);
    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch) throw new UnauthorizedException('Incorrect email or password');
    const tokens = await this.tokensService.generateTokens({
      sub: user.userId,
      email: user.email,
    });
    return tokens;
  }

  async logout(refreshToken: string): Promise<void> {
    await this.tokensService.deleteRefreshToken(refreshToken);
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const user = this.jwtService.decode<JwtPayload>(refreshToken);
    const accessToken = await this.tokensService.generateAccessToken({
      sub: user.sub,
      email: user.email,
    });
    return accessToken;
  }
}
