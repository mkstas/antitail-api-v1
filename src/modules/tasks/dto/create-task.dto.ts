import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly subjectId: string;

  @IsString()
  @IsNotEmpty()
  readonly taskTypeId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDate()
  @Type(() => Date)
  readonly deadline: Date;
}
