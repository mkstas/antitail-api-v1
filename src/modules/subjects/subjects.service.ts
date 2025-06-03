import { Injectable, NotFoundException } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(phoneId: string, createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subject = await this.prismaService.subject.create({
      data: { phoneId, ...createSubjectDto },
    });

    return subject;
  }

  async findAll(phoneId: string): Promise<Subject[]> {
    const subjects = await this.prismaService.subject.findMany({
      where: { phoneId },
    });

    if (!subjects.length) {
      throw new NotFoundException('Subjects are not found');
    }

    return subjects;
  }

  async findOne(id: string): Promise<Subject> {
    const subject = await this.prismaService.subject.findUnique({
      where: { subjectId: id },
    });

    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const { subjectId } = await this.findOne(id);
    const updatedSubject = await this.prismaService.subject.update({
      where: { subjectId },
      data: { ...updateSubjectDto },
    });

    return updatedSubject;
  }

  async remove(id: string): Promise<Subject> {
    const { subjectId } = await this.findOne(id);
    const removedSubject = await this.prismaService.subject.delete({
      where: { subjectId },
    });

    return removedSubject;
  }
}
