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
    const subtask = await this.subtasksService.create(dto);
    return subtask;
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Param('id', ParseIntPipe) taskId: number): Promise<Subtask[]> {
    const subtasks = await this.subtasksService.findAll(taskId);
    return subtasks;
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) subtaskId: number,
    @Body() dto: UpdateSubtaskDto,
  ): Promise<Subtask> {
    const subtask = await this.subtasksService.update(subtaskId, dto);
    return subtask;
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) subtaskId: number): Promise<Subtask> {
    const subtask = await this.subtasksService.delete(subtaskId);
    return subtask;
  }
}
