import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfilesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateProfileDto): Promise<Profile> {
    const profile = await this.prismaService.profile.create({
      data: { ...dto },
    });
    return profile;
  }

  async findOne(userId: number) {
    const profile = await this.prismaService.profile.findUnique({
      where: { userId },
    });
    return profile;
  }
}
