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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { TasksService } from './tasks.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { JwtPayload, JwtRequest } from 'src/auth/auth.types';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(dto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Req() req: JwtRequest,
    @Query('subjectId') subjectId: string,
    @Query('taskTypeId') taskTypeId: string,
  ): Promise<Task[]> {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const subjects = subjectId?.split(',');
    const taskTypes = taskTypeId?.split(',');
    return await this.tasksService.findAll(phoneId, subjects, taskTypes);
  }

  @Get('notifications')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findNotifications(@Req() req: JwtRequest) {
    const { sub: phoneId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    return await this.tasksService.findNotifications(phoneId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async find(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    return await this.tasksService.find(taskId);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(taskId, dto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) taskId: number) {
    return await this.tasksService.delete(taskId);
  }
}
