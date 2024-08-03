import { UpdateUserUseCase } from './../update-user-use-case';
import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { UserAccountDTO } from '../../../../domain/dtos/user/user-account-dto';
import { UpdateUserRequestDTO } from '../../../../infra/http/dtos/user/update-user-request-dto';

describe('UpdateUserUseCase', () => {
  let sut: UpdateUserUseCase;

  beforeEach(() => {
    sut = new UpdateUserUseCase(AuthProviderMock, UserRepositoryMock);
    jest.clearAllMocks();
  });

  it('should update the user preferences', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    UserRepositoryMock.update.mockResolvedValue(UserMockFactory.createEntity());

    const result = await sut.execute(
      UpdateUserRequestDTO.create({
        receiveEmails: true,
      }),
    );

    expect(result).toBeInstanceOf(UserAccountDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.update).toHaveBeenCalledTimes(1);
  });
});
