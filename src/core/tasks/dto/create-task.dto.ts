import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly subjectId: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  readonly typeId: number;

  @IsString()
  @MinLength(1)
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsDate()
  @Type(() => Date)
  readonly deadline: Date;
}
