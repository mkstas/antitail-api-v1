import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Phone } from '@prisma/client';
import { AccessTokenGuard } from '../jwt-token/guards/access-token.guard';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PhonesService } from './phones.service';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Post()
  create(@Body() createPhoneDto: CreatePhoneDto): Promise<Phone> {
    return this.phonesService.create(createPhoneDto);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findById(@Param('id') id: string): Promise<Phone> {
    return this.phonesService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updatePhoneDto: UpdatePhoneDto): Promise<Phone> {
    return this.phonesService.update(id, updatePhoneDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string): Promise<Phone> {
    return this.phonesService.remove(id);
  }
}
