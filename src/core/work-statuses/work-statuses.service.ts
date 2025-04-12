import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkStatusesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<WorkStatus[]> {
    const statuses = await this.prismaService.workStatus.findMany();
    if (!statuses.length) throw new NotFoundException('Work statuses are not forund');
    return statuses;
  }
}
