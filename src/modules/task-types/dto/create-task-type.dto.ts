import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateTaskTypeDto {
  @IsPositive()
  @IsNotEmpty()
  readonly subjectId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
