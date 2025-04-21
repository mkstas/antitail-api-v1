import { IsBoolean, IsOptional } from 'class-validator';
import { CreateSubtaskDto } from './create-subtask.dto';

export class UpdateSubtaskDto extends CreateSubtaskDto {
  @IsOptional()
  taskId: number;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
