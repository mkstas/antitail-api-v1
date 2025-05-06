import { Injectable, NotFoundException } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(phoneId: number, dto: CreateSubjectDto): Promise<Subject> {
    return await this.prismaService.subject.create({
      data: { phoneId, ...dto },
    });
  }

  async find(subjectId: number): Promise<Subject> {
    const subject = await this.prismaService.subject.findUnique({
      where: { subjectId },
    });
    if (!subject) {
      throw new NotFoundException('Subject is not found');
    }
    return subject;
  }

  async findAll(phoneId: number): Promise<Subject[]> {
    const subjects = await this.prismaService.subject.findMany({
      where: { phoneId },
    });
    if (!subjects.length) {
      throw new NotFoundException('Subjects are not found');
    }
    return subjects;
  }

  async update(subjectId: number, dto: UpdateSubjectDto): Promise<Subject> {
    await this.find(subjectId);
    return await this.prismaService.subject.update({
      where: { subjectId },
      data: dto,
    });
  }

  async delete(subjectId: number): Promise<Subject> {
    await this.find(subjectId);
    return await this.prismaService.subject.delete({
      where: { subjectId },
    });
  }
}
