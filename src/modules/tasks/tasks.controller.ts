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
import { Task } from '@prisma/client';
import { AccessTokenGuard } from '../iam/jwt-token/guards/access-token.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@Query('taskTypeId') taskTypeId: string) {
    return this.tasksService.findAll(taskTypeId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
