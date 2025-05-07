import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateTypeDto {
  @IsNumber()
  @Min(1)
  readonly subjectId: number;

  @IsString()
  @MinLength(1)
  readonly title: string;
}
