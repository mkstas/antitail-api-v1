import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SubjectsModule } from './core/subjects/subjects.module';
import { TaskTypesModule } from './core/task-types/task-types.module';
import { TasksModule } from './core/tasks/tasks.module';
import { SubtasksModule } from './core/subtasks/subtasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    SubjectsModule,
    TaskTypesModule,
    TasksModule,
    SubtasksModule,
  ],
})
export class AppModule {}
