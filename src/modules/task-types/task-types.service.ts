import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Injectable()
export class TaskTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(phoneId: string, createTaskTypeDto: CreateTaskTypeDto): Promise<TaskType> {
    const taskType = await this.prismaService.taskType.create({
      data: { phoneId, ...createTaskTypeDto },
    });

    return taskType;
  }

  async findAll(phoneId: string): Promise<TaskType[]> {
    const taskTypes = await this.prismaService.taskType.findMany({
      where: { phoneId },
    });

    if (!taskTypes.length) {
      throw new NotFoundException('Task types are not found');
    }

    return taskTypes;
  }

  async findOne(id: string): Promise<TaskType> {
    const taskType = await this.prismaService.taskType.findUnique({
      where: { taskTypeId: id },
    });

    if (!taskType) {
      throw new NotFoundException('Task type is not found');
    }

    return taskType;
  }

  async update(id: string, updateTaskTypeDto: UpdateTaskTypeDto): Promise<TaskType> {
    const { taskTypeId } = await this.findOne(id);
    const updatedTaskType = await this.prismaService.taskType.update({
      where: { taskTypeId },
      data: { ...updateTaskTypeDto },
    });

    return updatedTaskType;
  }

  async remove(id: string): Promise<TaskType> {
    const { taskTypeId } = await this.findOne(id);
    const removedTaskType = await this.prismaService.taskType.delete({
      where: { taskTypeId },
    });

    return removedTaskType;
  }
}
