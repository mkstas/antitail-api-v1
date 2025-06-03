import { IsPhoneNumber } from 'class-validator';

export class LoginDto {
  @IsPhoneNumber('RU')
  readonly phoneNumber: string;
}
