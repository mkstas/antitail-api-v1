import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { ProfilesModule } from './core/profiles/profiles.module';
import { TokensModule } from './core/tokens/tokens.module';
import { SubjectsModule } from './core/subjects/subjects.module';
import { TaskTypesModule } from './core/task-types/task-types.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    ProfilesModule,
    TokensModule,
    SubjectsModule,
    TaskTypesModule,
  ],
})
export class AppModule {}
