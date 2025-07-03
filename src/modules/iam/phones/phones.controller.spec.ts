import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Phone } from '@prisma/client';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhonesController } from './phones.controller';
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

const updatePhoneDto: UpdatePhoneDto = {
  phoneNumber: updatedPhone.phoneNumber,
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
            findById: jest.fn(),
            update: jest.fn(),
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

  describe('findById', () => {
    it('should return a phone by id', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(phone);

      await expect(controller.findById(phone.phoneId)).resolves.toEqual(phone);
    });

    it('should throw an exception from service if phone is not found', async () => {
      jest
        .spyOn(service, 'findById')
        .mockRejectedValue(new NotFoundException('Phone number is not found'));

      await expect(controller.findById(phone.phoneId)).rejects.toThrow(
        new NotFoundException('Phone number is not found'),
      );
    });
  });

  describe('update', () => {
    it('should return an updated phone', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(updatedPhone);

      await expect(controller.update(phone.phoneId, updatePhoneDto)).resolves.toEqual(updatedPhone);
    });

    it('should throw an exception from service if phone to update is not found', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Phone number is not found'));

      await expect(controller.update(phone.phoneId, updatePhoneDto)).rejects.toThrow(
        new NotFoundException('Phone number is not found'),
      );
    });
  });
});
