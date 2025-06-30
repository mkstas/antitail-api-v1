import { Injectable, NotFoundException } from '@nestjs/common';
import { Subtask } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSubtaskDto: CreateSubtaskDto): Promise<Subtask> {
    const subtask = await this.prismaService.subtask.create({
      data: { ...createSubtaskDto },
    });

    return subtask;
  }

  async findAll(taskId: string): Promise<Subtask[]> {
    const subtasks = await this.prismaService.subtask.findMany({
      where: { taskId },
      orderBy: { isDone: 'asc' },
    });

    if (!subtasks) {
      throw new NotFoundException('Subtasks are not found');
    }

    return subtasks;
  }

  async findById(id: string): Promise<Subtask> {
    const subtask = await this.prismaService.subtask.findUnique({
      where: { subtaskId: id },
    });

    if (!subtask) {
      throw new NotFoundException('Subtask is not found');
    }

    return subtask;
  }

  async update(id: string, updateSubtaskDto: UpdateSubtaskDto): Promise<Subtask> {
    const subtask = await this.findById(id);

    const updatedSubtask = await this.prismaService.subtask.update({
      where: { subtaskId: subtask.subtaskId },
      data: { ...updateSubtaskDto },
    });

    return updatedSubtask;
  }

  async remove(id: string): Promise<Subtask> {
    const subtask = await this.findById(id);

    const removedSubtask = await this.prismaService.subtask.delete({
      where: { subtaskId: subtask.subtaskId },
    });

    return removedSubtask;
  }
}
