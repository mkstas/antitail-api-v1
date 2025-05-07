import { IsOptional } from 'class-validator';
import { CreateSubjectDto } from './create-subject.dto';

export class UpdateSubjectDto extends CreateSubjectDto {
  @IsOptional()
  readonly title: string;
}
