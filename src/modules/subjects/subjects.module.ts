import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';

@Module({
  imports: [JwtModule],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {}
