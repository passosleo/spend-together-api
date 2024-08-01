import { IAuthProvider } from '../../application/providers/auth/auth-provider.types';
import { UserAccountDTO } from '../../domain/dtos/user/user-account-dto';

export const AuthProviderMock: jest.Mocked<IAuthProvider> = {
  getAuthenticatedUser: jest.fn<UserAccountDTO, []>(),
};
