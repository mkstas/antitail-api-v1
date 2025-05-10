import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { TaskTypesService } from './task-types.service';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { JwtRequest, JwtPayload } from 'src/auth/auth.types';

@Controller('task-types')
export class TaskTypesController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly taskTypesService: TaskTypesService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: JwtRequest, @Body() dto: CreateTaskTypeDto): Promise<TaskType> {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    return await this.taskTypesService.create(phoneId, dto);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async find(@Param('id', ParseIntPipe) taskTypeId: number): Promise<TaskType> {
    return await this.taskTypesService.find(taskTypeId);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: JwtRequest): Promise<TaskType[]> {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    return await this.taskTypesService.findAll(phoneId);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) taskTypeId: number,
    @Body() dto: UpdateTaskTypeDto,
  ): Promise<TaskType> {
    return await this.taskTypesService.update(taskTypeId, dto);
  }
}
