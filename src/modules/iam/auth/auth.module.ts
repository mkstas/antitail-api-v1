import { Module } from '@nestjs/common';
import { JwtTokenModule } from '../jwt-token/jwt-token.module';
import { PhonesModule } from '../phones/phones.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PhonesModule, JwtTokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
