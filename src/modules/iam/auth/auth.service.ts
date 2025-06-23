import { Injectable } from '@nestjs/common';
import { JwtTokenService } from '../jwt-token/jwt-token.service';
import { PhonesService } from '../phones/phones.service';
import { LoginDto } from './dto/login.dto.';

@Injectable()
export class AuthService {
  constructor(
    private readonly phonesService: PhonesService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    let candidate = await this.phonesService.findByPhoneNumber(loginDto.phoneNumber);

    if (!candidate) {
      candidate = await this.phonesService.create(loginDto);
    }

    return await this.jwtTokenService.generateAccessToken(candidate.phoneId);
  }
}
