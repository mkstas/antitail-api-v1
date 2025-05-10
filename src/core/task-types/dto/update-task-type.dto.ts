import { IsOptional } from 'class-validator';
import { CreateTaskTypeDto } from './create-task-type.dto';

export class UpdateTaskTypeDto extends CreateTaskTypeDto {
  @IsOptional()
  readonly title: string;
}
