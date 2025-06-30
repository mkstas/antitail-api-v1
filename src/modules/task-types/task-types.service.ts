import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

@Injectable()
export class TaskTypesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskTypeDto: CreateTaskTypeDto): Promise<TaskType> {
    const newTaskType = await this.prismaService.taskType.create({
      data: { ...createTaskTypeDto },
    });

    return newTaskType;
  }

  async findAll(subjectId: string): Promise<TaskType[]> {
    const taskTypes = await this.prismaService.taskType.findMany({
      where: { subjectId },
    });

    if (!taskTypes.length) {
      throw new NotFoundException('Task types are not found');
    }

    return taskTypes;
  }

  async findById(id: string): Promise<TaskType> {
    const taskType = await this.prismaService.taskType.findUnique({
      where: { taskTypeId: id },
    });

    if (!taskType) {
      throw new NotFoundException('Task type is not found');
    }

    return taskType;
  }

  async update(id: string, updateTaskTypeDto: UpdateTaskTypeDto): Promise<TaskType> {
    const taskType = await this.findById(id);

    const updatedTaskType = await this.prismaService.taskType.update({
      where: { taskTypeId: taskType.taskTypeId },
      data: { ...updateTaskTypeDto },
    });

    return updatedTaskType;
  }

  async remove(id: string): Promise<TaskType> {
    const taskType = await this.findById(id);

    const removedTaskType = await this.prismaService.taskType.delete({
      where: { taskTypeId: taskType.taskTypeId },
    });

    return removedTaskType;
  }
}
