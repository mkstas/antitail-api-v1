import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TaskType } from '@prisma/client';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { TaskTypesService } from './task-types.service';

const taskTypeId = '68cc942b-41c7-4c93-b214-d4f26b4577ee';
const subjectId = '68cc942b-41c7-4c93-b214-d4f26b4577ee';
const title = 'Лабораторная работа';
const updatedTitle = 'Практическая работа';

const createTaskTypeDto: CreateTaskTypeDto = {
  subjectId,
  title,
};

const updateTaskTypeDto: UpdateTaskTypeDto = {
  title: updatedTitle,
};

const taskType: TaskType = {
  taskTypeId,
  subjectId,
  title,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const updatedTaskType: TaskType = {
  ...taskType,
  title: updatedTitle,
};

const mockPrisma = {
  taskType: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('TaskTypesService', () => {
  let service: TaskTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskTypesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<TaskTypesService>(TaskTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task type', async () => {
      mockPrisma.taskType.findUnique.mockResolvedValue(null);
      mockPrisma.taskType.create.mockResolvedValue(taskType);

      await expect(service.create(createTaskTypeDto)).resolves.toEqual(taskType);
    });
  });

  describe('findAll', () => {
    it('should return an array of task types', async () => {
      mockPrisma.taskType.findMany.mockResolvedValue(Array(3).fill(taskType));

      await expect(service.findAll(subjectId)).resolves.toEqual(Array(3).fill(taskType));
    });

    it('should throw an exception if task types do not exist', async () => {
      mockPrisma.taskType.findMany.mockResolvedValue(undefined);

      await expect(service.findAll(subjectId)).rejects.toThrow(
        new NotFoundException('Task types are not found'),
      );
    });
  });

  describe('findById', () => {
    it('should return a task type', async () => {
      mockPrisma.taskType.findUnique.mockResolvedValue(taskType);

      await expect(service.findById(taskTypeId)).resolves.toEqual(taskType);
    });

    it('should throw an exception if task type does not exist', async () => {
      mockPrisma.taskType.findUnique.mockResolvedValue(null);

      await expect(service.findById(taskTypeId)).rejects.toThrow(
        new NotFoundException('Task type is not found'),
      );
    });
  });

  describe('update', () => {
    it('should return an updated task type', async () => {
      mockPrisma.taskType.findUnique.mockResolvedValue(taskType);
      mockPrisma.taskType.update.mockResolvedValue(updatedTaskType);

      await expect(service.update(taskTypeId, updateTaskTypeDto)).resolves.toEqual(updatedTaskType);
    });

    it('should throw an exception if task type to update does not exist', async () => {
      mockPrisma.taskType.findUnique.mockResolvedValue(null);

      await expect(service.update(taskTypeId, updateTaskTypeDto)).rejects.toThrow(
        new NotFoundException('Task type is not found'),
      );
    });
  });

  describe('remove', () => {
    it('should return a removed task type', async () => {
      mockPrisma.taskType.findUnique.mockResolvedValue(taskType);
      mockPrisma.taskType.delete.mockResolvedValue(taskType);

      await expect(service.remove(taskTypeId)).resolves.toEqual(taskType);
    });

    it('should throw an exception if the task type to remove does not exist', async () => {
      mockPrisma.taskType.findUnique.mockResolvedValue(null);

      await expect(service.remove(taskTypeId)).rejects.toThrow(
        new NotFoundException('Task type is not found'),
      );
    });
  });
});
