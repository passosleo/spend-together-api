import jwt from 'jsonwebtoken';
import { config } from '../../../config/app.config';
import { ITokenService } from '../../../application/services/auth/token-service.types';

export class JWTService implements ITokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret?: string, expiresIn?: string) {
    this.secret = secret || config.jwt.secret;
    this.expiresIn = expiresIn || config.jwt.expiresIn;
  }

  public createToken<T extends string | object | Buffer>(payload: T): string {
    return jwt.sign(JSON.parse(JSON.stringify(payload)), this.secret, { expiresIn: this.expiresIn });
  }

  public verifyToken<T>(token: string): T {
    return jwt.verify(token, this.secret) as T;
  }
}
