import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubtaskDto {
  @IsString()
  @IsNotEmpty()
  readonly taskId: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
