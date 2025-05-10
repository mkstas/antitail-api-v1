import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Injectable()
export class TaskTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(phoneId: number, dto: CreateTaskTypeDto): Promise<TaskType> {
    return await this.prismaService.taskType.create({
      data: { phoneId, ...dto },
    });
  }

  async find(taskTypeId: number): Promise<TaskType> {
    const taskType = await this.prismaService.taskType.findUnique({
      where: { taskTypeId },
    });
    if (!taskType) {
      throw new NotFoundException('Task type is not found');
    }
    return taskType;
  }

  async findAll(phoneId: number): Promise<TaskType[]> {
    const taskTypes = await this.prismaService.taskType.findMany({
      where: { phoneId },
    });
    if (!taskTypes.length) {
      throw new NotFoundException('Task types are not found');
    }
    return taskTypes;
  }

  async update(taskTypeId: number, dto: UpdateTaskTypeDto): Promise<TaskType> {
    const taskType = await this.prismaService.taskType.findUnique({
      where: { taskTypeId },
    });
    if (!taskType) {
      throw new NotFoundException('Task type is not found');
    }
    return await this.prismaService.taskType.update({
      where: { taskTypeId },
      data: { ...dto },
    });
  }
}
