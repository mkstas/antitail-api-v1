import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { WorkStatus } from '@prisma/client';
import { WorkStatusesService } from './work-statuses.service';

@Controller('work-statuses')
export class WorkStatusesController {
  constructor(private readonly workStatusesService: WorkStatusesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<WorkStatus[]> {
    const statuses = await this.workStatusesService.findAll();
    return statuses;
  }
}
