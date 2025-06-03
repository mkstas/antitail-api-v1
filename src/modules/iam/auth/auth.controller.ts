import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto.';
import { setJwtCookie } from 'src/shared/utils/jwt-cookies';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const accessToken = await this.authService.login(loginDto);
    setJwtCookie(res, 'accessToken', accessToken, 1000 * 60 * 60 * 24 * 90);
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
