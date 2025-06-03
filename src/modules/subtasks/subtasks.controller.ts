import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Subtask } from '@prisma/client';
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { AccessTokenGuard } from '../iam/auth/guards/access-token.guard';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  create(@Body() createSubtaskDto: CreateSubtaskDto): Promise<Subtask> {
    return this.subtasksService.create(createSubtaskDto);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll(@Query('taskId') taskId: string): Promise<Subtask[]> {
    return this.subtasksService.findAll(taskId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  findOne(@Param('id') id: string): Promise<Subtask> {
    return this.subtasksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  update(@Param('id') id: string, @Body() updateSubtaskDto: UpdateSubtaskDto): Promise<Subtask> {
    return this.subtasksService.update(id, updateSubtaskDto);
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard)
  remove(@Param('id') id: string): Promise<Subtask> {
    return this.subtasksService.remove(id);
  }
}
