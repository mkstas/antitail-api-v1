import { Response } from 'express';

export interface JwtPayload {
  sub: string;
}

export interface JwtToken {
  accessToken: string;
}

export interface JwtRequest extends Request {
  cookies: JwtToken;
}

export const setJwtCookie = (res: Response, name: string, token: string, age: number): void => {
  res.cookie(name, token, {
    httpOnly: true,
    secure: false,
    maxAge: age,
  });
};
