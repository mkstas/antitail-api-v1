import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TaskTypesService } from './task-types.service';
import { TaskTypesController } from './task-types.controller';

@Module({
  imports: [JwtModule],
  controllers: [TaskTypesController],
  providers: [TaskTypesService],
})
export class TaskTypesModule {}
