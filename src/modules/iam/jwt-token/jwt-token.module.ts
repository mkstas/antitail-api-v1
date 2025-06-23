import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt-token.service';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [ConfigModule, JwtModule],
  providers: [JwtTokenService, AccessTokenStrategy],
  exports: [JwtTokenService],
})
export class JwtTokenModule {}
