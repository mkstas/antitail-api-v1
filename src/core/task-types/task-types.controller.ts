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
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TaskTypesService } from './task-types.service';
import { TaskType } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { JwtRequest, JwtPayload } from 'src/core/tokens/tokens.types';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';

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
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const taskType = await this.taskTypesService.create(userId, dto);
    return taskType;
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: JwtRequest): Promise<TaskType[]> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const taskTypes = await this.taskTypesService.findAll(userId);
    return taskTypes;
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) taskTypeId: number,
    @Req() req: JwtRequest,
    @Body() dto: UpdateTaskTypeDto,
  ) {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const taskType = await this.taskTypesService.update(userId, taskTypeId, dto);
    return taskType;
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param('id', ParseIntPipe) taskTypeId: number,
    @Req() req: JwtRequest,
  ): Promise<TaskType> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const taskType = await this.taskTypesService.delete(userId, taskTypeId);
    return taskType;
  }
}
