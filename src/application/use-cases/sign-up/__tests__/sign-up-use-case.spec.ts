import { HelpersMock } from './../../../../test/helpers/helpers-mock';
import { MailServiceMock } from './../../../../test/services/mail-service-mock';
import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { SignUpUseCase } from './../sign-up-use-case';
import { TokenServiceMock } from './../../../../test/services/token-service-mock';
import { faker } from '@faker-js/faker';
import { UserMockFactory } from '../../../../test/factories/user-mock-factory';
import { SignUpRequestDTO } from '../../../../infra/http/dtos/sign-up/sign-up-request-dto';
import { Exception } from '../../../../infra/exception';
import { SignUpResponseDTO } from '../../../../infra/http/dtos/sign-up/sign-up-response-dto';

describe('SignUpUseCase', () => {
  let sut: SignUpUseCase;

  beforeEach(() => {
    sut = new SignUpUseCase(UserRepositoryMock, MailServiceMock, TokenServiceMock, HelpersMock);
    jest.clearAllMocks();
  });

  it('should throw CONFLICT exception when email already exists', async () => {
    UserRepositoryMock.findByUniqueKey
      .mockImplementationOnce(async (data) => (data.email ? UserMockFactory.createEntity() : null))
      .mockImplementationOnce(async () => null);

    await expect(
      sut.execute(
        SignUpRequestDTO.create({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(2);
    expect(HelpersMock.password.hashPassword).not.toHaveBeenCalled();
    expect(UserRepositoryMock.create).not.toHaveBeenCalled();
    expect(HelpersMock.encryption.encrypt).not.toHaveBeenCalled();
    expect(HelpersMock.date.calculateExpiration).not.toHaveBeenCalled();
    expect(MailServiceMock.renderTemplate).not.toHaveBeenCalled();
    expect(TokenServiceMock.createToken).not.toHaveBeenCalled();
    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should throw FORBIDDEN exception username already exists', async () => {
    UserRepositoryMock.findByUniqueKey
      .mockImplementationOnce(async () => null)
      .mockImplementationOnce(async (data) => (data.username ? UserMockFactory.createEntity() : null));

    await expect(
      sut.execute(
        SignUpRequestDTO.create({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(2);
    expect(HelpersMock.password.hashPassword).not.toHaveBeenCalled();
    expect(UserRepositoryMock.create).not.toHaveBeenCalled();
    expect(HelpersMock.encryption.encrypt).not.toHaveBeenCalled();
    expect(HelpersMock.date.calculateExpiration).not.toHaveBeenCalled();
    expect(MailServiceMock.renderTemplate).not.toHaveBeenCalled();
    expect(TokenServiceMock.createToken).not.toHaveBeenCalled();
    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should sign up user and send email verification', async () => {
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(null).mockResolvedValue(null);
    HelpersMock.password.hashPassword.mockResolvedValue(faker.string.alpha(100));
    UserRepositoryMock.create.mockResolvedValue(UserMockFactory.createEntity());
    HelpersMock.encryption.encrypt.mockReturnValue(faker.string.alpha(100));
    HelpersMock.date.calculateExpiration.mockReturnValue(faker.date.future());
    MailServiceMock.renderTemplate.mockReturnValue(faker.string.alpha(100));
    TokenServiceMock.createToken.mockReturnValue(faker.string.alpha(100));
    MailServiceMock.sendMail.mockResolvedValue();

    const result = await sut.execute(
      SignUpRequestDTO.create({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }),
    );

    expect(result.session.type).toBe('Bearer');
    expect(result).toBeInstanceOf(SignUpResponseDTO);
    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(2);
    expect(HelpersMock.password.hashPassword).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(HelpersMock.encryption.encrypt).toHaveBeenCalledTimes(1);
    expect(HelpersMock.date.calculateExpiration).toHaveBeenCalledTimes(1);
    expect(MailServiceMock.renderTemplate).toHaveBeenCalledTimes(1);
    expect(TokenServiceMock.createToken).toHaveBeenCalledTimes(1);
    expect(MailServiceMock.sendMail).toHaveBeenCalledTimes(1);
  });
});
