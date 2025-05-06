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
  UseGuards,
} from '@nestjs/common';
import { Subtask } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateSubtaskDto): Promise<Subtask> {
    return await this.subtasksService.create(dto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('taskId', ParseIntPipe) taskId: number): Promise<Subtask[]> {
    return await this.subtasksService.findAll(taskId);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) subtaskId: number,
    @Body() dto: UpdateSubtaskDto,
  ): Promise<Subtask> {
    return await this.subtasksService.update(subtaskId, dto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) subtaskId: number): Promise<Subtask> {
    return await this.subtasksService.delete(subtaskId);
  }
}
