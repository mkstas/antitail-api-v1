import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Phone } from '@prisma/client';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhonesService } from './phones.service';

const phone: Phone = {
  phoneId: '7be45b78-45b2-4bed-8b70-26774f996cbe',
  phoneNumber: '79000000000',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const updatedPhone: Phone = {
  ...phone,
  phoneNumber: '79000000001',
};

const createPhoneDto: CreatePhoneDto = {
  phoneNumber: phone.phoneNumber,
};

const updatePhoneDto: UpdatePhoneDto = {
  phoneNumber: updatedPhone.phoneNumber,
};

const mockPrisma = {
  phone: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
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

      await expect(service.findById(phone.phoneId)).resolves.toEqual(phone);
    });

    it('should throw an exception if phone is not found', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(null);

      await expect(service.findById(phone.phoneId)).rejects.toThrow(
        new NotFoundException('Phone number is not found'),
      );
    });
  });

  describe('findByPhoneNumber', () => {
    it('should return a phone by phone number', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(phone);

      await expect(service.findByPhoneNumber(phone.phoneNumber)).resolves.toEqual(phone);
    });

    it('should throw an exception if phone is not found', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(null);

      await expect(service.findByPhoneNumber(phone.phoneNumber)).resolves.toBe(null);
    });
  });

  describe('update', () => {
    it('should return an updated phone', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(phone);
      mockPrisma.phone.update.mockResolvedValue(updatedPhone);

      await expect(service.update(phone.phoneId, updatePhoneDto)).resolves.toEqual(updatedPhone);
    });

    it('should throw an exception if phone to update is not found', async () => {
      mockPrisma.phone.findUnique.mockResolvedValue(null);

      await expect(service.update(phone.phoneId, updatePhoneDto)).rejects.toThrow(
        new NotFoundException('Phone number is not found'),
      );
    });
  });
});
