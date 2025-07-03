import { validate } from 'class-validator';
import { CreatePhoneDto } from './create-phone.dto';

describe('CreatePhoneDto', () => {
  it('should validate correct phone number', async () => {
    const dto = new CreatePhoneDto();
    dto.phoneNumber = '79000000000';

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('should throw an exceptions if phone number is not valid ', async () => {
    const dto = new CreatePhoneDto();
    dto.phoneNumber = '99000000000';

    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('phoneNumber');
    expect(errors[0].constraints).toHaveProperty('isPhoneNumber');
  });
});
