import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { PhonesModule } from './modules/iam/phones/phones.module';
import { AuthModule } from './modules/iam/auth/auth.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { TaskTypesModule } from './modules/task-types/task-types.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { SubtasksModule } from './modules/subtasks/subtasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PhonesModule,
    AuthModule,
    SubjectsModule,
    TaskTypesModule,
    TasksModule,
    SubtasksModule,
  ],
})
export class AppModule {}
