import { MinLength, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @MinLength(1)
  readonly title: string;
}
