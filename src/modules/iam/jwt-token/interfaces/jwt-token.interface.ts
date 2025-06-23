import { Request } from 'express';

export interface JwtPayload {
  sub: string;
}

export interface JwtToken {
  accessToken: string;
}

export interface JwtRequest extends Request {
  cookies: JwtToken;
}
