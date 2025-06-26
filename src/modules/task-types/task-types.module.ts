import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TaskTypesController } from './task-types.controller';
import { TaskTypesService } from './task-types.service';

@Module({
  imports: [JwtModule],
  controllers: [TaskTypesController],
  providers: [TaskTypesService],
})
export class TaskTypesModule {}
