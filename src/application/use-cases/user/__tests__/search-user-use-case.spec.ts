import { SearchUserUseCase } from './../search-user-use-case';
import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { SearchUserRequestDTO } from '../../../../infra/http/dtos/user/search-user-request-dto';
import { faker } from '@faker-js/faker';
import { SearchUserResponseDTO } from '../../../../infra/http/dtos/user/search-user-response-dto';

describe('SearchUserUseCase', () => {
  let sut: SearchUserUseCase;

  beforeEach(() => {
    sut = new SearchUserUseCase(AuthProviderMock, UserRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return a list of users', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    UserRepositoryMock.findAllByUsername.mockResolvedValue(UserMockFactory.createEntities(5));

    const result = await sut.execute(
      SearchUserRequestDTO.create({
        username: faker.internet.userName(),
      }),
    );

    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(SearchUserResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findAllByUsername).toHaveBeenCalledTimes(1);
  });
});
