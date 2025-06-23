import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/iam/auth/auth.module';
import { JwtTokenModule } from './modules/iam/jwt-token/jwt-token.module';
import { PhonesModule } from './modules/iam/phones/phones.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { SubtasksModule } from './modules/subtasks/subtasks.module';
import { TaskTypesModule } from './modules/task-types/task-types.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PhonesModule,
    JwtTokenModule,
    AuthModule,
    SubjectsModule,
    TaskTypesModule,
    TasksModule,
    SubtasksModule,
  ],
})
export class AppModule {}
