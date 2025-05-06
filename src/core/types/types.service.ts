import { Injectable, NotFoundException } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(phoneId: number, dto: CreateTypeDto): Promise<Type> {
    return await this.prismaService.type.create({
      data: { phoneId, ...dto },
    });
  }

  async find(typeId: number): Promise<Type> {
    const subject = await this.prismaService.type.findUnique({
      where: { typeId },
    });
    if (!subject) {
      throw new NotFoundException('Type is not found');
    }
    return subject;
  }

  async findAll(phoneId: number): Promise<Type[]> {
    const subjects = await this.prismaService.type.findMany({
      where: { phoneId },
    });
    if (!subjects.length) {
      throw new NotFoundException('Types are not found');
    }
    return subjects;
  }

  async update(typeId: number, dto: UpdateTypeDto): Promise<Type> {
    await this.find(typeId);
    return await this.prismaService.type.update({
      where: { typeId },
      data: dto,
    });
  }

  async delete(typeId: number): Promise<Type> {
    await this.find(typeId);
    return await this.prismaService.type.delete({
      where: { typeId },
    });
  }
}
