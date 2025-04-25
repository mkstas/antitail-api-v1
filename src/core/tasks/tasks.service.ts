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
    if (!task) {
      throw new NotFoundException('Task is not found');
    }
    return task;
  }

  async findAll(userId: number, subjects: string[], taskTypes: string[]): Promise<Task[]> {
    const updatedSubjects = subjects?.map(id => ({ subjectId: Number(id) }));
    const updatedTaskTypes = taskTypes?.map(id => ({ taskTypeId: Number(id) }));

    let tasks: Task[] = [];

    if (updatedSubjects && updatedTaskTypes) {
      tasks = await this.prismaService.task.findMany({
        where: {
          userId,
          isHidden: false,
          AND: [{ OR: updatedSubjects }, { OR: updatedTaskTypes }],
        },
        orderBy: [{ isDone: 'asc' }, { deadline: 'asc' }],
      });
    } else if (updatedSubjects) {
      tasks = await this.prismaService.task.findMany({
        where: {
          userId,
          isHidden: false,
          OR: updatedSubjects,
        },
        orderBy: [{ isDone: 'asc' }, { deadline: 'asc' }],
      });
    } else if (updatedTaskTypes) {
      tasks = await this.prismaService.task.findMany({
        where: {
          userId,
          isHidden: false,
          OR: updatedTaskTypes,
        },
        orderBy: [{ isDone: 'asc' }, { deadline: 'asc' }],
      });
    } else {
      tasks = await this.prismaService.task.findMany({
        where: { userId, isHidden: false, OR: updatedSubjects },
        orderBy: [{ isDone: 'asc' }, { deadline: 'asc' }],
      });
    }

    if (!tasks.length) {
      throw new NotFoundException('Tasks are not found');
    }

    return tasks;
  }

  async update(userId: number, taskId: number, dto: UpdateTaskDto): Promise<Task> {
    let task = await this.prismaService.task.findUnique({
      where: { userId, taskId, isHidden: true },
    });

    if (task) {
      task = await this.prismaService.task.update({
        data: { isHidden: false },
        where: { taskId },
      });

      return task;
    }

    // task = await this.prismaService.task.findUnique({
    //   where: { userId, title: dto.title, isHidden: false },
    // });

    // if (task) {
    //   throw new NotFoundException('Task is already exists');
    // }

    task = await this.prismaService.task.findUnique({
      where: { userId, taskId },
    });

    if (!task) {
      throw new NotFoundException('Task is not found');
    }

    task = await this.prismaService.task.update({
      where: { taskId },
      data: { ...dto },
    });

    return task;
  }

  async delete(userId: number, taskId: number): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { userId, taskId, isHidden: false },
    });
    if (!task) {
      throw new NotFoundException('Task is not found');
    }
    const updatedTask = await this.prismaService.task.update({
      where: { taskId },
      data: { isHidden: true },
    });
    return updatedTask;
  }
}
