import { IsNumber, Min } from 'class-validator';

export class CreateProfileDto {
  @IsNumber()
  @Min(1)
  readonly userId: number;
}
