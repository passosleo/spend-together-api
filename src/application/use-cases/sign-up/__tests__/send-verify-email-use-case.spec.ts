import { SendVerifyEmailUseCase } from './../send-verify-email-use-case';
import { HelpersMock } from './../../../../test/helpers/helpers-mock';
import { MailServiceMock } from './../../../../test/services/mail-service-mock';
import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { faker } from '@faker-js/faker';
import { UserMockFactory } from '../../../../test/factories/user-mock-factory';
import { SignUpRequestDTO } from '../../../../infra/http/dtos/sign-up/sign-up-request-dto';
import { Exception } from '../../../../infra/exception';

describe('SendVerifyEmailUseCase', () => {
  let sut: SendVerifyEmailUseCase;

  beforeEach(() => {
    sut = new SendVerifyEmailUseCase(UserRepositoryMock, MailServiceMock, HelpersMock);
    jest.clearAllMocks();
  });

  it('should throw NOT_FOUND exception user does not exist', async () => {
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(null);

    await expect(
      sut.execute(
        SignUpRequestDTO.create({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
    expect(HelpersMock.encryption.encrypt).not.toHaveBeenCalled();
    expect(HelpersMock.date.calculateExpiration).not.toHaveBeenCalled();
    expect(MailServiceMock.renderTemplate).not.toHaveBeenCalled();
    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should throw BAD_REQUEST exception if user email is already verified', async () => {
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(UserMockFactory.createEntity({ emailVerified: true }));

    await expect(
      sut.execute(
        SignUpRequestDTO.create({
          email: faker.internet.email(),
          username: faker.internet.userName(),
          password: faker.internet.password(),
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
    expect(HelpersMock.encryption.encrypt).not.toHaveBeenCalled();
    expect(HelpersMock.date.calculateExpiration).not.toHaveBeenCalled();
    expect(MailServiceMock.renderTemplate).not.toHaveBeenCalled();
    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should send email verification', async () => {
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(UserMockFactory.createEntity({ emailVerified: false }));
    HelpersMock.encryption.encrypt.mockReturnValue(faker.string.alpha(100));
    HelpersMock.date.calculateExpiration.mockReturnValue(faker.date.future());
    MailServiceMock.renderTemplate.mockReturnValue(faker.string.alpha(100));
    MailServiceMock.sendMail.mockResolvedValue();

    await sut.execute(
      SignUpRequestDTO.create({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }),
    );

    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
    expect(HelpersMock.encryption.encrypt).toHaveBeenCalledTimes(1);
    expect(HelpersMock.date.calculateExpiration).toHaveBeenCalledTimes(1);
    expect(MailServiceMock.renderTemplate).toHaveBeenCalledTimes(1);
    expect(MailServiceMock.sendMail).toHaveBeenCalledTimes(1);
  });
});
