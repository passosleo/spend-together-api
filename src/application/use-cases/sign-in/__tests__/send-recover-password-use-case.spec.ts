import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { MailServiceMock } from './../../../../test/services/mail-service-mock';
import { SendRecoverPasswordUseCase } from './../send-recover-password-use-case';
import { faker } from '@faker-js/faker';
import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { HelpersMock } from './../../../../test/helpers/helpers-mock';
import { Exception } from '../../../../infra/exception';
import { SendRecoverPasswordRequestDTO } from '../../../../infra/http/dtos/sign-in/send-recover-password-request-dto';

describe('SendRecoverPasswordUseCase', () => {
  let sut: SendRecoverPasswordUseCase;

  beforeEach(() => {
    sut = new SendRecoverPasswordUseCase(UserRepositoryMock, MailServiceMock, HelpersMock);
    jest.clearAllMocks();
  });

  it('should throw NOT_FOUND exception if user does not exist', async () => {
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(null);

    await expect(
      sut.execute(
        SendRecoverPasswordRequestDTO.create({
          email: faker.internet.email(),
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
    expect(HelpersMock.encryption.encrypt).not.toHaveBeenCalled();
    expect(HelpersMock.date.calculateExpiration).not.toHaveBeenCalled();
    expect(MailServiceMock.renderTemplate).not.toHaveBeenCalled();
    expect(MailServiceMock.sendMail).not.toHaveBeenCalled();
  });

  it('should send recover password email', async () => {
    UserRepositoryMock.findByUniqueKey.mockResolvedValue(UserMockFactory.createEntity());
    HelpersMock.encryption.encrypt.mockReturnValue(faker.string.uuid());
    HelpersMock.date.calculateExpiration.mockReturnValue(faker.date.future());
    MailServiceMock.renderTemplate.mockReturnValue(faker.lorem.sentence());
    MailServiceMock.sendMail.mockResolvedValue();

    await sut.execute(
      SendRecoverPasswordRequestDTO.create({
        email: faker.internet.email(),
      }),
    );

    expect(UserRepositoryMock.findByUniqueKey).toHaveBeenCalledTimes(1);
    expect(HelpersMock.encryption.encrypt).toHaveBeenCalledTimes(1);
    expect(HelpersMock.date.calculateExpiration).toHaveBeenCalledTimes(1);
    expect(MailServiceMock.renderTemplate).toHaveBeenCalledTimes(1);
    expect(MailServiceMock.sendMail).toHaveBeenCalledTimes(1);
  });
});
