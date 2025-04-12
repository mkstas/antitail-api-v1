import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WorkTypesController } from './work-types.controller';
import { WorkTypesService } from './work-types.service';

@Module({
  imports: [JwtModule],
  controllers: [WorkTypesController],
  providers: [WorkTypesService],
})
export class WorkTypesModule {}
