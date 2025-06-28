import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Phone } from '@prisma/client';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhonesController } from './phones.controller';
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

describe('PhonesController', () => {
  let controller: PhonesController;
  let service: PhonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhonesController],
      providers: [
        {
          provide: PhonesService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PhonesController>(PhonesController);
    service = module.get<PhonesService>(PhonesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new phone number', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(phone);

      await expect(controller.create(createPhoneDto)).resolves.toEqual(phone);
    });

    it('should throw an exception from service if phone is already exists', async () => {
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new BadRequestException('Phone number is already exists'));

      await expect(controller.create(createPhoneDto)).rejects.toThrow(
        new BadRequestException('Phone number is already exists'),
      );
    });
  });

  describe('findById', () => {
    it('should return a phone by id', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(phone);

      await expect(controller.findById(phoneId)).resolves.toEqual(phone);
    });

    it('should throw an exception from service if phone does not exist', async () => {
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(new NotFoundException('Phone number does not exist'));

      await expect(controller.findById(phoneId)).rejects.toThrow(
        new NotFoundException('Phone number does not exist'),
      );
    });
  });

  describe('update', () => {
    it('should return an updated phone', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(updatedPhone);

      await expect(controller.update(phoneId, updatePhoneDto)).resolves.toEqual(updatedPhone);
    });

    it('should throw an exception from service if phone to update does not exist', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Phone number does not exist'));

      await expect(controller.update(phoneId, updatePhoneDto)).rejects.toThrow(
        new NotFoundException('Phone number does not exist'),
      );
    });
  });

  describe('remove', () => {
    it('should return a removed phone', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(phone);

      await expect(controller.remove(phoneId)).resolves.toEqual(phone);
    });

    it('should throw an exception from service if phone to remove does not exist', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new NotFoundException('Phone number does not exist'));

      await expect(controller.remove(phoneId)).rejects.toThrow(
        new NotFoundException('Phone number does not exist'),
      );
    });
  });
});
