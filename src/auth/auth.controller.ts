import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const accessToken = await this.authService.login(dto);
    this.setTokenCookie(res, accessToken);
  }

  @Delete('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  logout(@Res({ passthrough: true }) res: Response): void {
    res.clearCookie('accessToken');
  }

  @Get('check')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  check() {}

  private setTokenCookie(res: Response, accessToken: string): void {
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 90,
    });
  }
}
