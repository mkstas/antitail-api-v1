import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  @IsOptional()
  readonly subjectId: number;

  @IsOptional()
  readonly typeId: number;

  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly deadline: Date;

  @IsOptional()
  @IsBoolean()
  readonly isDone: boolean;
}
