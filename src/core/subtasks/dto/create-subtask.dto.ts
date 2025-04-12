import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateSubtaskDto {
  @IsNumber()
  @Min(1)
  readonly taskId: number;

  @IsString()
  @MinLength(1)
  readonly description: string;
}
