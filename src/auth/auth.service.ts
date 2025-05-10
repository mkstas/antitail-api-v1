import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(dto: LoginUserDto): Promise<string> {
    let candidate = await this.prismaService.phone.findUnique({
      where: { phone: dto.phone },
    });
    if (!candidate) {
      candidate = await this.prismaService.phone.create({
        data: { phone: dto.phone },
      });
    }
    return String(await this.generateAccessToken(candidate.phoneId));
  }

  private async generateAccessToken(sub: number): Promise<string> {
    return await this.jwtService.signAsync(
      { sub },
      { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '90d' },
    );
  }
}
