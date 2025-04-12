import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkTypeDto } from './dto/create-work-type.dto';
import { UpdateWorkTypeDto } from './dto/update-work-type.dto';

@Injectable()
export class WorkTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateWorkTypeDto): Promise<WorkType> {
    const workType = await this.prismaService.workType.create({
      data: { userId, ...dto },
    });
    return workType;
  }

  async findAll(userId: number): Promise<WorkType[]> {
    const workTypes = await this.prismaService.workType.findMany({
      where: { userId },
    });
    if (!workTypes.length) throw new NotFoundException('Subjects is not found');
    return workTypes;
  }

  async update(userId: number, workTypeId: number, dto: UpdateWorkTypeDto): Promise<WorkType> {
    const workType = await this.prismaService.workType.findFirst({
      where: { userId, workTypeId },
    });
    if (!workType) throw new NotFoundException('WorkType is not found');
    const updatedWorkType = await this.prismaService.workType.update({
      where: { workTypeId },
      data: { ...dto },
    });
    return updatedWorkType;
  }

  async delete(userId: number, workTypeId: number): Promise<WorkType> {
    const workType = await this.prismaService.workType.findFirst({
      where: { userId, workTypeId },
    });
    if (!workType) throw new NotFoundException('WorkType is not found');
    const updatedWorkType = await this.prismaService.workType.update({
      where: { workTypeId },
      data: { isHidden: true },
    });
    return updatedWorkType;
  }
}
