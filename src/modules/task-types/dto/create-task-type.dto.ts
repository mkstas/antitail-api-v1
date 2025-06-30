import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskTypeDto {
  @IsString()
  @IsNotEmpty()
  readonly subjectId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
