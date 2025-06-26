import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
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

  async findAll(phoneId: string, subjects: string[], taskTypes: string[]): Promise<Task[]> {
    const updatedSubjects = subjects?.map(id => ({ subjectId: id }));
    const updatedTaskTypes = taskTypes?.map(id => ({ taskTypeId: id }));

    const subjectTasks = await this.prismaService.subject.findMany({
      where: { phoneId },
      include: {
        tasks: {
          where: { AND: [{ OR: updatedSubjects }, { OR: updatedTaskTypes }] },
          orderBy: [{ deadline: 'asc' }],
        },
      },
    });

    const tasks: Task[] = [];

    subjectTasks.forEach(subject => {
      subject.tasks.forEach(task => tasks.push(task));
    });

    tasks.sort((a, b) => Number(new Date(a.deadline)) - Number(new Date(b.deadline)));
    tasks.sort((a, b) => Number(a.isDone) - Number(b.isDone));

    if (!tasks.length) {
      throw new NotFoundException('Tasks are not found');
    }

    return tasks;
  }

  async findNotifications(phoneId: string): Promise<Task[]> {
    const subjects = await this.prismaService.subject.findMany({
      where: { phoneId },
      include: {
        tasks: {
          orderBy: { deadline: 'asc' },
        },
      },
    });

    const tasks: Task[] = [];

    subjects.forEach(subject => {
      subject.tasks.forEach(task => tasks.push(task));
    });

    tasks.sort((a, b) => {
      return Number(new Date(a.deadline)) - Number(new Date(b.deadline));
    });

    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { taskId: id },
    });

    if (!task) {
      throw new NotFoundException('Task is not found');
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { taskId } = await this.findOne(id);
    const updatedTask = await this.prismaService.task.update({
      where: { taskId },
      data: { ...updateTaskDto },
    });

    return updatedTask;
  }

  async remove(id: string): Promise<Task> {
    const { taskId } = await this.findOne(id);
    const removedTask = await this.prismaService.task.delete({
      where: { taskId },
    });

    return removedTask;
  }
}
