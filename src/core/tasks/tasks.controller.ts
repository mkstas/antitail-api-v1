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
import { Task } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { JwtRequest, JwtPayload } from 'src/core/tokens/tokens.types';
import { TasksService } from './tasks.service';
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
  async create(@Req() req: JwtRequest, @Body() dto: CreateTaskDto): Promise<Task> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const task = await this.tasksService.create(userId, dto);
    return task;
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async find(@Req() req: JwtRequest, @Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const task = await this.tasksService.find(userId, taskId);
    return task;
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: JwtRequest): Promise<Task[]> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const tasks = await this.tasksService.findAll(userId);
    return tasks;
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: JwtRequest,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<Task> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const task = await this.tasksService.update(userId, taskId, dto);
    return task;
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Req() req: JwtRequest, @Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const task = await this.tasksService.delete(userId, taskId);
    return task;
  }
}
