import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = await this.prismaService.task.create({
      data: { userId, ...dto },
    });
    return task;
  }

  async find(userId: number, taskId: number): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { userId, taskId, isHidden: false },
    });
    if (!task) throw new NotFoundException('Task is not found');
    return task;
  }

  async findAll(userId: number): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany({
      where: { userId, isHidden: false },
    });
    if (!tasks.length) throw new NotFoundException('Tasks are not found');
    return tasks;
  }

  async update(userId: number, taskId: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { userId, taskId },
    });
    if (!task) throw new NotFoundException('Task is not found');
    const updatedTask = await this.prismaService.task.update({
      where: { taskId },
      data: { ...dto },
    });
    return updatedTask;
  }

  async delete(userId: number, taskId: number): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { userId, taskId },
    });
    if (!task) throw new NotFoundException('Task is not found');
    const updatedTask = await this.prismaService.task.update({
      where: { taskId },
      data: { isHidden: true },
    });
    return updatedTask;
  }
}
