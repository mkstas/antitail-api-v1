import { Injectable, NotFoundException } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(phoneId: string, createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const newSubject = await this.prismaService.subject.create({
      data: { phoneId, ...createSubjectDto },
    });

    return newSubject;
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

  async findById(id: string): Promise<Subject> {
    const subject = await this.prismaService.subject.findUnique({
      where: { subjectId: id },
    });

    if (!subject) {
      throw new NotFoundException('Subject is not found');
    }

    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    const subject = await this.findById(id);

    const updatedSubject = await this.prismaService.subject.update({
      where: { subjectId: subject.subjectId },
      data: { ...updateSubjectDto },
    });

    return updatedSubject;
  }

  async remove(id: string): Promise<Subject> {
    const subject = await this.findById(id);

    const removedSubject = await this.prismaService.subject.delete({
      where: { subjectId: subject.subjectId },
    });

    return removedSubject;
  }
}
