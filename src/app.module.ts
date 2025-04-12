import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WorkTypesModule } from './core/work-types/work-types.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { TokensModule } from './tokens/tokens.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UsersModule,
    ProfilesModule,
    TokensModule,
    AuthModule,
    SubjectsModule,
    WorkTypesModule,
  ],
})
export class AppModule {}
