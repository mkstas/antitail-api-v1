import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Type } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTypeDto): Promise<Type> {
    return await this.typesService.create(dto);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('id', ParseIntPipe) subjectId: number): Promise<Type[]> {
    return await this.typesService.findAll(subjectId);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) typeId: number,
    @Body() dto: UpdateTypeDto,
  ): Promise<Type> {
    return await this.typesService.update(typeId, dto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) typeId: number): Promise<Type> {
    return await this.typesService.delete(typeId);
  }
}
