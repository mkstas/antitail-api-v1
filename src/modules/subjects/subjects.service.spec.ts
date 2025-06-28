import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Subject } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectsService } from './subjects.service';

const phoneId = '68cc942b-41c7-4c93-b214-d4f26b4577ee';
const subjectId = '68cc942b-41c7-4c93-b214-d4f26b4577ee';
const title = 'Программирование';
const updatedTitle = 'Информатика';

const createSubjectDto: CreateSubjectDto = {
  title,
};

const updateSubjectDto: UpdateSubjectDto = {
  title: updatedTitle,
};

const subject: Subject = {
  subjectId,
  phoneId,
  title,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const updatedSubject: Subject = {
  ...subject,
  title: updatedTitle,
};

const mockPrisma = {
  subject: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('SubjectsService', () => {
  let service: SubjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subject', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(null);
      mockPrisma.subject.create.mockResolvedValue(subject);

      await expect(service.create(phoneId, createSubjectDto)).resolves.toEqual(subject);
    });

    it('should throw an exception if subject is already exists', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(subject);

      await expect(service.create(phoneId, createSubjectDto)).rejects.toThrow(
        new BadRequestException('Subject is already exists'),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of subjects', async () => {
      mockPrisma.subject.findMany.mockResolvedValue([subject, subject, subject]);

      await expect(service.findAll(phoneId)).resolves.toEqual([subject, subject, subject]);
    });

    it('should throw an exception if subjects do not exist', async () => {
      mockPrisma.subject.findMany.mockResolvedValue(undefined);

      await expect(service.findAll(phoneId)).rejects.toThrow(
        new NotFoundException('Subjects are not found'),
      );
    });
  });

  describe('findById', () => {
    it('should return a subject', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(subject);

      await expect(service.findById(subjectId)).resolves.toEqual(subject);
    });

    it('should throw an exception if subject does not exist', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(null);

      await expect(service.findById(subjectId)).rejects.toThrow(
        new NotFoundException('Subject is not found'),
      );
    });
  });

  describe('update', () => {
    it('should return an updated subject', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(subject);
      mockPrisma.subject.update.mockResolvedValue(updatedSubject);

      await expect(service.update(subjectId, updateSubjectDto)).resolves.toEqual(updatedSubject);
    });

    it('should throw an exception if subject to update does not exist', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(null);

      await expect(service.update(subjectId, updateSubjectDto)).rejects.toThrow(
        new NotFoundException('Subject is not found'),
      );
    });
  });

  describe('remove', () => {
    it('should return a removed subject', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(subject);
      mockPrisma.subject.delete.mockResolvedValue(subject);

      await expect(service.remove(subjectId)).resolves.toEqual(subject);
    });

    it('should throw an exception if the subject to remove does not exist', async () => {
      mockPrisma.subject.findUnique.mockResolvedValue(null);

      await expect(service.remove(subjectId)).rejects.toThrow(
        new NotFoundException('Subject is not found'),
      );
    });
  });
});
