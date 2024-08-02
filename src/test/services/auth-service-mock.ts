import { IAuthService } from '../../application/services/auth/auth-service.types';
import { UserAccountDTO } from '../../domain/dtos/user/user-account-dto';

export const AuthServiceMock: jest.Mocked<IAuthService> = {
  authenticate: jest.fn<Promise<UserAccountDTO>, [string, string]>(),
};
