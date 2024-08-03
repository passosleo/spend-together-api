import { GetUserInfoUseCase } from './../get-user-info-use-case';
import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { Exception } from '../../../../infra/exception';
import { UserAccountDTO } from '../../../../domain/dtos/user/user-account-dto';

describe('GetUserInfoUseCase', () => {
  let sut: GetUserInfoUseCase;

  beforeEach(() => {
    sut = new GetUserInfoUseCase(AuthProviderMock, UserRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw an NOT_FOUND exception when the user does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(null);

    await expect(sut.execute()).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
  });

  it('should return the user account info', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(UserMockFactory.createEntity());

    const result = await sut.execute();

    expect(result).toBeInstanceOf(UserAccountDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
  });
});
