import { IsPhoneNumber } from 'class-validator';

export class CreatePhoneDto {
  @IsPhoneNumber('RU')
  readonly phoneNumber: string;
}
