import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AccessTokenGuard } from '../jwt-token/guards/access-token.guard';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto.';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const accessToken = await this.authService.login(loginDto);

    this.jwtTokenService.setCookieWithToken(
      res,
      'accessToken',
      accessToken,
      1000 * 60 * 60 * 24 * 90,
    );
  }

  @Delete('logout')
  @UseGuards(AccessTokenGuard)
  logout(@Res({ passthrough: true }) res: Response): void {
    res.clearCookie('accessToken');
  }

  @Get('check')
  @UseGuards(AccessTokenGuard)
  check() {}
}
