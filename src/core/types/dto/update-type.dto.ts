import { IsOptional } from 'class-validator';
import { CreateTypeDto } from './create-type.dto';

export class UpdateTypeDto extends CreateTypeDto {
  @IsOptional()
  readonly subjectId: number;

  @IsOptional()
  readonly title: string;
}
