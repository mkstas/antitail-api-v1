import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Phone } from '@prisma/client';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PhonesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    const phoneNumber = await this.prismaService.phone.findUnique({
      where: { phoneNumber: createPhoneDto.phoneNumber },
    });

    if (phoneNumber) {
      throw new BadRequestException('Phone number is already exists');
    }

    const newPhoneNumber = await this.prismaService.phone.create({
      data: { phoneNumber: createPhoneDto.phoneNumber },
    });

    return newPhoneNumber;
  }

  async findOne(id: string): Promise<Phone> {
    const phoneNumber = await this.prismaService.phone.findUnique({
      where: { phoneId: id },
    });

    if (!phoneNumber) {
      throw new NotFoundException('Phone number is not found');
    }

    return phoneNumber;
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto): Promise<Phone> {
    const phoneNumber = await this.findOne(id);
    const updatedPhoneNumber = await this.prismaService.phone.update({
      where: { phoneId: phoneNumber.phoneId },
      data: { phoneNumber: updatePhoneDto.phoneNumber },
    });

    return updatedPhoneNumber;
  }

  async remove(id: string): Promise<Phone> {
    const phoneNumber = await this.findOne(id);
    const removedPhoneNumber = await this.prismaService.phone.delete({
      where: { phoneId: phoneNumber.phoneId },
    });

    return removedPhoneNumber;
  }
}
