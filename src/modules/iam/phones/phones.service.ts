import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Phone } from '@prisma/client';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class PhonesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    const phone = await this.prismaService.phone.findUnique({
      where: { phoneNumber: createPhoneDto.phoneNumber },
    });

    if (phone) {
      throw new BadRequestException('Phone number is already exists');
    }

    const newPhone = await this.prismaService.phone.create({
      data: { phoneNumber: createPhoneDto.phoneNumber },
    });

    return newPhone;
  }

  async findById(id: string): Promise<Phone> {
    const phone = await this.prismaService.phone.findUnique({
      where: { phoneId: id },
    });

    if (!phone) {
      throw new NotFoundException('Phone number is not found');
    }

    return phone;
  }

  async findByPhoneNumber(phoneNumber: string): Promise<Phone> {
    const phone = await this.prismaService.phone.findUnique({
      where: { phoneNumber },
    });

    if (!phone) {
      throw new NotFoundException('Phone number is not found');
    }

    return phone;
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto): Promise<Phone> {
    const phone = await this.findById(id);

    const updatedPhone = await this.prismaService.phone.update({
      where: { phoneId: phone.phoneId },
      data: { phoneNumber: updatePhoneDto.phoneNumber },
    });

    return updatedPhone;
  }

  async remove(id: string): Promise<Phone> {
    const phone = await this.findById(id);

    const removedPhone = await this.prismaService.phone.delete({
      where: { phoneId: phone.phoneId },
    });

    return removedPhone;
  }
}
