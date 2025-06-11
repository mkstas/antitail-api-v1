import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PhonesController } from './phones.controller';
import { PhonesService } from './phones.service';

const phoneId = '68cc942b-41c7-4c93-b214-d4f26b4577ee';
const phoneNumber = '79000000000';
const updatedPhoneNumber = '79000000001';
const phone = { phoneId, phoneNumber };

const value = {
  create: jest.fn().mockResolvedValue(phone),
  findOne: jest.fn().mockResolvedValue(phone),
  update: jest.fn().mockResolvedValue(phone),
  remove: jest.fn().mockResolvedValue(phone),
};

describe('Phones Controller', () => {
  let controller: PhonesController;
  let service: PhonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhonesController],
      providers: [
        {
          provide: PhonesService,
          useValue: value,
        },
      ],
    }).compile();

    controller = module.get<PhonesController>(PhonesController);
    service = module.get<PhonesService>(PhonesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new phone number', async () => {
    expect(await controller.create({ phoneNumber })).toEqual(phone);
  });

  it('should throw an exception if phone number is already exists', async () => {
    jest
      .spyOn(service, 'create')
      .mockRejectedValue(new BadRequestException('Phone number is already exists'));

    try {
      await controller.create({ phoneNumber });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      if (error instanceof BadRequestException) {
        expect(error.message).toBe('Phone number is already exists');
      }
    }
  });

  it('should return a phone number', async () => {
    expect(await controller.findOne(phoneId)).toEqual(phone);
  });

  it('should throw an exception if phone number is not found', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValue(new NotFoundException('Phone number is not found'));

    try {
      await controller.findOne('00000000');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      if (error instanceof NotFoundException) {
        expect(error.message).toBe('Phone number is not found');
      }
    }
  });

  it('should return an updated phone number', async () => {
    expect(await controller.update(phoneId, { phoneNumber: updatedPhoneNumber }));
  });

  it('should throw an exception if phone number is not found', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValue(new NotFoundException('Phone number is not found'));

    try {
      await controller.update('00000000', { phoneNumber: updatedPhoneNumber });
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      if (error instanceof NotFoundException) {
        expect(error.message).toBe('Phone number is not found');
      }
    }
  });

  it('should return a removed phone number', async () => {
    expect(await controller.remove(phoneId));
  });

  it('should throw an exception if phone number is not found', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValue(new NotFoundException('Phone number is not found'));

    try {
      await controller.remove('00000000');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      if (error instanceof NotFoundException) {
        expect(error.message).toBe('Phone number is not found');
      }
    }
  });
});
