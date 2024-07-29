export interface ITokenService {
  createToken<T extends string | object | Buffer>(payload: T): string;
  verifyToken<T>(token: string): T;
}
