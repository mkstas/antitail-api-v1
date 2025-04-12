import { IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  @IsOptional()
  subjectId: number;

  @IsOptional()
  taskTypeId: number;

  @IsOptional()
  title: string;

  @IsOptional()
  description: string;

  @IsOptional()
  deadline: Date;
}
