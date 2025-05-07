import { Injectable, NotFoundException } from '@nestjs/common';
import { Type } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateTypeDto): Promise<Type> {
    return await this.prismaService.type.create({
      data: { ...dto },
    });
  }

  async findAll(subjectId: number): Promise<Type[]> {
    const types = await this.prismaService.type.findMany({
      where: { subjectId },
    });
    if (!types.length) {
      throw new NotFoundException('Types are not found');
    }
    return types;
  }

  async update(typeId: number, dto: UpdateTypeDto): Promise<Type> {
    const type = await this.prismaService.type.findFirst({
      where: { typeId },
    });
    if (!type) {
      throw new NotFoundException('Type is not found');
    }
    return await this.prismaService.type.update({
      where: { typeId },
      data: { ...dto },
    });
  }

  async delete(typeId: number): Promise<Type> {
    const type = await this.prismaService.type.findFirst({
      where: { typeId },
    });
    if (!type) {
      throw new NotFoundException('Type is not found');
    }
    return await this.prismaService.type.delete({
      where: { typeId },
    });
  }
}
