import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { DeleteUserAccountUseCase } from './../delete-user-account-use-case';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';

describe('DeleteUserAccountUseCase', () => {
  let sut: DeleteUserAccountUseCase;

  beforeEach(() => {
    sut = new DeleteUserAccountUseCase(AuthProviderMock, UserRepositoryMock);
    jest.clearAllMocks();
  });

  it('should delete the user account', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());

    const result = await sut.execute();

    expect(result).toBeUndefined();
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.delete).toHaveBeenCalledTimes(1);
  });
});
