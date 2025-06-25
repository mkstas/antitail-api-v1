import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Phone } from '@prisma/client';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhonesService } from './phones.service';

const phoneId = '68cc942b-41c7-4c93-b214-d4f26b4577ee';
const phoneNumber = '79000000000';
const updatedPhoneNumber = '79000000001';

const createPhoneDto: CreatePhoneDto = {
  phoneNumber,
};

const updatePhoneDto: UpdatePhoneDto = {
  phoneNumber: updatedPhoneNumber,
};

const phone: Phone = {
  phoneId,
  phoneNumber,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const updatedPhone: Phone = {
  ...phone,
  phoneNumber: updatedPhoneNumber,
};

const mockPrisma = {
  phone: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('PhonesService', () => {
  let service: PhonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhonesService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<PhonesService>(PhonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new phone', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(null);
      mockPrisma.phone.create.mockResolvedValue(phone);

      await expect(service.create(createPhoneDto)).resolves.toEqual(phone);
    });

    it('should throw an exception if phone is already exists', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(phone);

      await expect(service.create(createPhoneDto)).rejects.toThrow(
        new BadRequestException('Phone number is already exists'),
      );
    });
  });

  describe('findById', () => {
    it('should return a phone by id', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(phone);

      await expect(service.findById(phoneId)).resolves.toEqual(phone);
    });

    it('should throw an exception if phone does not exist', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(null);

      await expect(service.findById(phoneId)).rejects.toThrow(
        new NotFoundException('Phone number does not exist'),
      );
    });
  });

  describe('findByPhoneNumber', () => {
    it('should return a phone by phone number', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(phone);

      await expect(service.findByPhoneNumber(phoneNumber)).resolves.toEqual(phone);
    });

    it('should throw an exception if phone does not exist', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(null);

      await expect(service.findByPhoneNumber(phoneNumber)).resolves.toBe(null);
    });
  });

  describe('update', () => {
    it('should return an updated phone', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(phone);
      mockPrisma.phone.update.mockResolvedValue(updatedPhone);

      await expect(service.update(phoneId, updatePhoneDto)).resolves.toEqual(updatedPhone);
    });

    it('should throw an exception if phone to update does not exist', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(null);

      await expect(service.update(phoneId, updatePhoneDto)).rejects.toThrow(
        new NotFoundException('Phone number does not exist'),
      );
    });
  });

  describe('remove', () => {
    it('should return a removed phone', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(phone);
      mockPrisma.phone.delete.mockResolvedValue(updatedPhone);

      await expect(service.remove(phoneId)).resolves.toEqual(updatedPhone);
    });

    it('should throw an exception if phone to remove does not exist', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(null);

      await expect(service.remove(phoneId)).rejects.toThrow(
        new NotFoundException('Phone number does not exist'),
      );
    });
  });
});
