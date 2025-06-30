import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.prismaService.task.create({
      data: { ...createTaskDto },
    });

    return task;
  }

  async findAll(taskTypeId: string): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany({
      where: { taskTypeId },
    });

    if (!tasks) {
      throw new NotFoundException('Tasks are not found');
    }

    return tasks;
  }

  async findById(id: string): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { taskId: id },
    });

    if (!task) {
      throw new NotFoundException('Task is not found');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findById(id);

    const updatedTask = await this.prismaService.task.update({
      where: { taskId: task.taskId },
      data: { ...updateTaskDto },
    });

    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const task = await this.findById(id);

    const removedTask = await this.prismaService.task.delete({
      where: { taskId: task.taskId },
    });

    return removedTask;
  }
}
