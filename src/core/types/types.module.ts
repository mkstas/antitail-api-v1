import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';

@Module({
  imports: [JwtModule],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
