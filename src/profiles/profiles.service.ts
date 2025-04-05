import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    let profile = await this.prismaService.profile.findUnique({
      where: { userId: dto.userId },
    });
    if (profile) throw new BadRequestException('Profile is already exists');
    profile = await this.prismaService.profile.create({
      data: { userId: dto.userId },
    });
    return profile;
  }

  async findOne(userId: number) {
    const profile = await this.prismaService.profile.findUnique({
      where: { userId },
    });
    if (!profile) throw new NotFoundException('Profile is not found');
    return profile;
  }
}
