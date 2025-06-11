import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PhonesService } from './phones.service';
import { PrismaService } from '../../../common/prisma/prisma.service';

const phoneId = '68cc942b-41c7-4c93-b214-d4f26b4577ee';
const phoneNumber = '79000000002';
const updatedPhoneNumber = '79000000001';
const phone = { phoneId, phoneNumber };

const database = {
  phone: {
    findUnique: jest.fn().mockResolvedValue(phone),
    findOne: jest.fn().mockResolvedValue(phone),
    create: jest.fn().mockResolvedValue(phone),
    update: jest.fn().mockResolvedValue(phone),
    delete: jest.fn().mockResolvedValue(phone),
  },
};

describe('Phones Service', () => {
  let service: PhonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhonesService,
        {
          provide: PrismaService,
          useValue: database,
        },
      ],
    }).compile();

    service = module.get<PhonesService>(PhonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new phone number', async () => {
    expect(await service.create({ phoneNumber })).toEqual(phone);
  });

  it('should throw an exception if phone number is already exists', async () => {
    try {
      await service.create({ phoneNumber });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      if (error instanceof BadRequestException) {
        expect(error.message).toBe('Phone number is already exists');
      }
    }
  });

  it('should return a phone number by id', async () => {
    expect(await service.findOne(phoneId)).toEqual(phone);
  });

  it('should return a phone number by phone number', async () => {
    expect(await service.findByPhoneNumber(phoneNumber)).toEqual(phone);
  });

  it('should return an updated phone number', async () => {
    expect(await service.update(phoneId, { phoneNumber: updatedPhoneNumber })).toEqual(phone);
  });

  it('should return a removed phone number', async () => {
    expect(await service.remove(phoneId));
  });
});
