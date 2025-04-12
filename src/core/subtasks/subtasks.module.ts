import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SubtasksController } from './subtasks.controller';
import { SubtasksService } from './subtasks.service';

@Module({
  imports: [JwtModule],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
