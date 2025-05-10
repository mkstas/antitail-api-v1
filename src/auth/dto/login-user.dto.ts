import { IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @Length(11)
  readonly phone: string;
}
