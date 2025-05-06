import { IsString, MinLength } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @MinLength(1)
  readonly title: string;
}
