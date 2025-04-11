import { MinLength, IsString } from 'class-validator';

export class CreateSubjectDto {
  @MinLength(1)
  @IsString()
  readonly title: string;
}
