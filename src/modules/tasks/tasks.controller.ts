import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Task } from '@prisma/client';
import { JwtPayload, JwtRequest } from 'src/common/utils/jwt-cookies';
import { AccessTokenGuard } from '../iam/auth/guards/access-token.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(
    @Req() req: JwtRequest,
    @Query('subjectId') subjectId: string,
    @Query('taskTypeId') taskTypeId: string,
  ) {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const subjects = subjectId?.split(',');
    const taskTypes = taskTypeId?.split(',');
    return this.tasksService.findAll(phoneId, subjects, taskTypes);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string): Promise<Task> {
    return this.tasksService.findOne(id);
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
