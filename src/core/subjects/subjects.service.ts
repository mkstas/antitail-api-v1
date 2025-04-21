import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Subject } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, dto: CreateSubjectDto): Promise<Subject> {
    let subject = await this.prismaService.subject.findUnique({
      where: { isHidden: true, ...dto },
    });

    if (subject) {
      subject = await this.prismaService.subject.update({
        where: { subjectId: subject.subjectId },
        data: { isHidden: false },
      });

      return subject;
    }

    subject = await this.prismaService.subject.findUnique({
      where: { isHidden: false, ...dto },
    });

    if (subject) {
      throw new BadRequestException('Subject is already exists');
    }

    subject = await this.prismaService.subject.create({
      data: { userId, ...dto },
    });

    return subject;
  }

  async findAll(userId: number): Promise<Subject[]> {
    const subjects = await this.prismaService.subject.findMany({
      where: { userId, isHidden: false },
      orderBy: { subjectId: 'asc' },
    });

    if (!subjects.length) {
      throw new NotFoundException('Subjects are not found');
    }

    return subjects;
  }

  async update(userId: number, subjectId: number, dto: UpdateSubjectDto): Promise<Subject> {
    let subject = await this.prismaService.subject.findUnique({
      where: { userId, isHidden: true, ...dto },
    });

    if (subject) {
      subject = await this.prismaService.subject.update({
        data: { isHidden: false },
        where: { subjectId },
      });

      return subject;
    }

    subject = await this.prismaService.subject.findUnique({
      where: { userId, isHidden: false, ...dto },
    });

    if (subject) {
      throw new NotFoundException('Subject is already exists');
    }

    subject = await this.prismaService.subject.findUnique({
      where: { userId, subjectId },
    });

    if (!subject) {
      throw new NotFoundException('Subject is not found');
    }

    subject = await this.prismaService.subject.update({
      where: { subjectId },
      data: { ...dto },
    });

    return subject;
  }

  async delete(userId: number, subjectId: number): Promise<Subject> {
    const subject = await this.prismaService.subject.findUnique({
      where: { subjectId, userId, isHidden: false },
    });

    if (!subject) {
      throw new NotFoundException('Subject is not found');
    }

    const updatedSubject = await this.prismaService.subject.update({
      where: { subjectId },
      data: { isHidden: true },
    });

    return updatedSubject;
  }
}
