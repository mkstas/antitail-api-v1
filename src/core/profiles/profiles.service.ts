import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number): Promise<Profile> {
    let profile = await this.prismaService.profile.findUnique({
      where: { userId },
    });
    if (profile) throw new BadRequestException('Profile is already exists');
    profile = await this.prismaService.profile.create({
      data: { userId },
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
