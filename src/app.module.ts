import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PhonesModule } from './modules/iam/phones/phones.module';
import { AuthModule } from './modules/iam/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, PhonesModule, AuthModule],
})
export class AppModule {}
