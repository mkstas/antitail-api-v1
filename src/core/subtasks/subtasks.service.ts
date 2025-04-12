import { Injectable, NotFoundException } from '@nestjs/common';
import { Subtask } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateSubtaskDto): Promise<Subtask> {
    const subtask = await this.prismaService.subtask.create({
      data: { ...dto },
    });
    return subtask;
  }

  async findAll(taskId: number): Promise<Subtask[]> {
    const subtasks = await this.prismaService.subtask.findMany({
      where: { taskId },
    });
    if (!subtasks.length) throw new NotFoundException('Subtasks are not found');
    return subtasks;
  }

  async update(subtaskId: number, dto: UpdateSubtaskDto): Promise<Subtask> {
    const subtask = await this.prismaService.subtask.findUnique({
      where: { subtaskId },
    });
    if (!subtask) throw new NotFoundException('Subtask is not found');
    const updatedSubtask = await this.prismaService.subtask.update({
      where: { subtaskId },
      data: { ...dto },
    });
    return updatedSubtask;
  }

  async delete(subtaskId: number): Promise<Subtask> {
    const subtask = await this.prismaService.subtask.findUnique({
      where: { subtaskId },
    });
    if (!subtask) throw new NotFoundException('Subtask is not found');
    const updatedSubtask = await this.prismaService.subtask.update({
      where: { subtaskId },
      data: { isHidden: true },
    });
    return updatedSubtask;
  }
}
