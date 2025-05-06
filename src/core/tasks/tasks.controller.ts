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
import { JwtService } from '@nestjs/jwt';
import { Task } from '@prisma/client';
import { TasksService } from './tasks.service';
import { JwtRequest, JwtPayload } from 'src/auth/auth.types';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
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
    return await this.tasksService.create(userId, dto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('subjectId') subjectId: string,
    @Query('typeId') typeId: string,
    @Req() req: JwtRequest,
  ): Promise<Task[]> {
    const { sub: userId } = this.jwtService.decode<JwtPayload>(req.cookies.accessToken);
    const subjects = subjectId?.split(',');
    const types = typeId?.split(',');
    return await this.tasksService.findAll(userId, subjects, types);
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
  async delete(@Param('id', ParseIntPipe) taskId: number): Promise<Task> {
    return await this.tasksService.delete(taskId);
  }
}
