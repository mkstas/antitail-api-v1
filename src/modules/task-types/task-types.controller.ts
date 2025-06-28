import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskType } from '@prisma/client';
import { AccessTokenGuard } from '../iam/jwt-token/guards/access-token.guard';
import { CreateTaskTypeDto } from './dto/create-task-type.dto';
import { UpdateTaskTypeDto } from './dto/update-task-type.dto';
import { TaskTypesService } from './task-types.service';

@Controller('task-types')
export class TaskTypesController {
  constructor(private readonly taskTypesService: TaskTypesService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createTaskTypeDto: CreateTaskTypeDto): Promise<TaskType> {
    return this.taskTypesService.create(createTaskTypeDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@Query('subjectId') subjectId: string): Promise<TaskType[]> {
    return this.taskTypesService.findAll(subjectId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string): Promise<TaskType> {
    return this.taskTypesService.findById(id);
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
