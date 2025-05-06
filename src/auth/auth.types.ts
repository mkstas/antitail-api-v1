export interface JwtToken {
  accessToken: string;
}

export interface JwtRequest extends Request {
  cookies: JwtToken;
}

export interface JwtPayload {
  sub: number;
}
