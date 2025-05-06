import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(phoneId: number, dto: CreateTaskDto): Promise<Task> {
    return await this.prismaService.task.create({
      data: { phoneId, ...dto },
    });
  }

  async find(taskId: number): Promise<Task> {
    const task = await this.prismaService.task.findFirst({
      where: { taskId },
    });
    if (!task) {
      throw new NotFoundException('Task is not found');
    }
    return task;
  }

  async findAll(phoneId: number, subjects: string[], taskTypes: string[]): Promise<Task[]> {
    const updatedSubjects = subjects?.map(id => ({ subjectId: Number(id) }));
    const updatedTypes = taskTypes?.map(id => ({ typeId: Number(id) }));
    let tasks: Task[] = [];

    if (updatedSubjects && updatedTypes) {
      tasks = await this.prismaService.task.findMany({
        where: {
          phoneId,
          AND: [{ OR: updatedSubjects }, { OR: updatedTypes }],
        },
        orderBy: [{ isDone: 'asc' }, { deadline: 'asc' }],
      });
    } else if (updatedSubjects) {
      tasks = await this.prismaService.task.findMany({
        where: {
          phoneId,
          OR: updatedSubjects,
        },
        orderBy: [{ isDone: 'asc' }, { deadline: 'asc' }],
      });
    } else if (updatedTypes) {
      tasks = await this.prismaService.task.findMany({
        where: {
          phoneId,
          OR: updatedTypes,
        },
        orderBy: [{ isDone: 'asc' }, { deadline: 'asc' }],
      });
    } else {
      tasks = await this.prismaService.task.findMany({
        where: { phoneId, OR: updatedSubjects },
        orderBy: [{ isDone: 'asc' }, { deadline: 'asc' }],
      });
    }

    if (!tasks.length) {
      throw new NotFoundException('Tasks are not found');
    }
    return tasks;
  }

  async update(taskId: number, dto: UpdateTaskDto): Promise<Task> {
    await this.find(taskId);
    return await this.prismaService.task.update({
      where: { taskId },
      data: { ...dto },
    });
  }

  async delete(taskId: number): Promise<Task> {
    await this.find(taskId);
    return await this.prismaService.task.delete({
      where: { taskId },
    });
  }
}
