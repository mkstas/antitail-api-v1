import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<User> {
    let user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (user) throw new BadRequestException('Email is already taken');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    user = await this.prismaService.user.create({
      data: { email: dto.email, passwordHash },
    });
    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException('User is not found');
    return user;
  }
}
