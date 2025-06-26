import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TaskType } from '@prisma/client';
import { JwtPayload, JwtRequest } from 'src/common/utils/jwt-cookies';
import { AccessTokenGuard } from '../iam/auth/guards/access-token.guard';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { TaskTypesService } from './task-types.service';

@Controller('task-types')
export class TaskTypesController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly taskTypesService: TaskTypesService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Req() req: JwtRequest, @Body() createTaskTypeDto: CreateTaskTypeDto): Promise<TaskType> {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    return this.taskTypesService.create(phoneId, createTaskTypeDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@Req() req: JwtRequest): Promise<TaskType[]> {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    return this.taskTypesService.findAll(phoneId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string): Promise<TaskType> {
    return this.taskTypesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateTaskTypeDto: UpdateTaskTypeDto): Promise<TaskType> {
    return this.taskTypesService.update(id, updateTaskTypeDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string): Promise<TaskType> {
    return this.taskTypesService.remove(id);
  }
}
