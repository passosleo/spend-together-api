import { TokenServiceMock } from './../../../../test/services/token-service-mock';
import { AuthServiceMock } from './../../../../test/services/auth-service-mock';
import { SignInUseCase } from './../sign-in-use-case';
import { faker } from '@faker-js/faker';
import { SignInRequestDTO } from '../../../../infra/http/dtos/sign-in/sign-in-request-dto';
import { UserMockFactory } from '../../../../test/factories/user-mock-factory';
import { SignInResponseDTO } from '../../../../infra/http/dtos/sign-in/sign-in-response-dto';

describe('SignInUseCase', () => {
  let sut: SignInUseCase;

  beforeEach(() => {
    sut = new SignInUseCase(AuthServiceMock, TokenServiceMock);
    jest.clearAllMocks();
  });

  it('should sign in user and return access token', async () => {
    AuthServiceMock.authenticate.mockResolvedValue(UserMockFactory.createAccount());
    TokenServiceMock.createToken.mockReturnValue(faker.string.uuid());

    const result = await sut.execute(
      SignInRequestDTO.create({
        email: faker.internet.email(),
        password: faker.internet.password(),
      }),
    );

    expect(result.type).toBe('Bearer');
    expect(result).toBeInstanceOf(SignInResponseDTO);
    expect(AuthServiceMock.authenticate).toHaveBeenCalledTimes(1);
    expect(TokenServiceMock.createToken).toHaveBeenCalledTimes(1);
  });
});
