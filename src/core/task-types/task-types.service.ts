import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Injectable()
export class TaskTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateTaskTypeDto): Promise<TaskType> {
    const taskType = await this.prismaService.taskType.create({
      data: { userId, ...dto },
    });
    return taskType;
  }

  async findAll(userId: number): Promise<TaskType[]> {
    const taskTypes = await this.prismaService.taskType.findMany({
      where: { userId },
      orderBy: { taskTypeId: 'asc' },
    });
    if (!taskTypes.length) {
      throw new NotFoundException('Task types are not found');
    }
    return taskTypes;
  }

  async update(userId: number, taskTypeId: number, dto: UpdateTaskTypeDto): Promise<TaskType> {
    let taskType = await this.prismaService.taskType.findFirst({
      where: { userId, taskTypeId },
    });
    if (!taskType) {
      throw new NotFoundException('Task type is not found');
    }
    taskType = await this.prismaService.taskType.update({
      where: { taskTypeId },
      data: { ...dto },
    });
    return taskType;
  }

  async delete(userId: number, taskTypeId: number): Promise<TaskType> {
    let taskType = await this.prismaService.taskType.findFirst({
      where: { userId, taskTypeId },
    });
    if (!taskType) {
      throw new NotFoundException('Task type is not found');
    }
    taskType = await this.prismaService.taskType.delete({
      where: { taskTypeId },
    });
    return taskType;
  }
}
