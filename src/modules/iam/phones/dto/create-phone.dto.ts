import { IsPhoneNumber } from 'class-validator';

export class CreatePhoneDto {
  @IsPhoneNumber('RU', { message: 'invalid phone number format' })
  phoneNumber: string;
}
