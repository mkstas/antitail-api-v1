import { Injectable, NotFoundException } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateSubjectDto): Promise<Subject> {
    const subject = await this.prismaService.subject.create({
      data: { userId, ...dto },
    });
    return subject;
  }

  async findAll(userId: number): Promise<Subject[]> {
    const subjects = await this.prismaService.subject.findMany({
      where: { userId },
    });
    if (!subjects.length) throw new NotFoundException('Subjects are not found');
    return subjects;
  }

  async update(userId: number, subjectId: number, dto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.prismaService.subject.findUnique({
      where: { subjectId, userId },
    });
    if (!subject) throw new NotFoundException('Subject is not found');
    const updatedSubject = await this.prismaService.subject.update({
      where: { subjectId },
      data: { ...dto },
    });
    return updatedSubject;
  }

  async delete(userId: number, subjectId: number): Promise<Subject> {
    const subject = await this.prismaService.subject.findUnique({
      where: { subjectId, userId },
    });
    if (!subject) throw new NotFoundException('Subject is not found');
    const updatedSubject = await this.prismaService.subject.update({
      where: { subjectId },
      data: { isHidden: true },
    });
    return updatedSubject;
  }
}
