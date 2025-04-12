import { MinLength, IsString } from 'class-validator';

export class CreateWorkTypeDto {
  @MinLength(1)
  @IsString()
  readonly title: string;
}
