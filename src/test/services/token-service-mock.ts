import { ITokenService } from '../../application/services/auth/token-service.types';

export const TokenServiceMock: jest.Mocked<ITokenService> = {
  createToken: jest.fn<string, [any]>(),
  verifyToken: jest.fn<any, [string]>(),
};
