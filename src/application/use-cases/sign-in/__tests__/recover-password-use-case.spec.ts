import { faker } from '@faker-js/faker';
import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { HelpersMock } from './../../../../test/helpers/helpers-mock';
import { RecoverPasswordUseCase } from './../recover-password-use-case';
import { Exception } from '../../../../infra/exception';
import { RecoverPasswordRequestDTO } from '../../../../infra/http/dtos/sign-in/recover-password-request-dto';

describe('RecoverPasswordUseCase', () => {
  let sut: RecoverPasswordUseCase;

  beforeEach(() => {
    sut = new RecoverPasswordUseCase(UserRepositoryMock, HelpersMock);
    jest.clearAllMocks();
  });

  it('should throw BAD_REQUEST exception if token is not valid', async () => {
    HelpersMock.encryption.decrypt.mockReturnValue({ userId: faker.string.uuid(), expiresAt: faker.date.past() });
    HelpersMock.date.isExpiredDate.mockReturnValue(true);

    await expect(
      sut.execute(
        RecoverPasswordRequestDTO.create({
          token: faker.string.alpha(100),
          newPassword: faker.internet.password(),
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(HelpersMock.encryption.decrypt).toHaveBeenCalledTimes(1);
    expect(HelpersMock.date.isExpiredDate).toHaveBeenCalledTimes(1);
    expect(HelpersMock.password.hashPassword).not.toHaveBeenCalled();
    expect(UserRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should not update user password if new password is not provided', async () => {
    HelpersMock.encryption.decrypt.mockReturnValue({ userId: faker.string.uuid(), expiresAt: faker.date.future() });
    HelpersMock.date.isExpiredDate.mockReturnValue(false);

    await sut.execute(
      RecoverPasswordRequestDTO.create({
        token: faker.string.alpha(100),
      }),
    );

    expect(HelpersMock.encryption.decrypt).toHaveBeenCalledTimes(1);
    expect(HelpersMock.date.isExpiredDate).toHaveBeenCalledTimes(1);
    expect(HelpersMock.password.hashPassword).not.toHaveBeenCalled();
    expect(UserRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should update user password', async () => {
    HelpersMock.encryption.decrypt.mockReturnValue({ userId: faker.string.uuid(), expiresAt: faker.date.future() });
    HelpersMock.date.isExpiredDate.mockReturnValue(false);

    await sut.execute(
      RecoverPasswordRequestDTO.create({
        token: faker.string.alpha(100),
        newPassword: faker.internet.password(),
      }),
    );

    expect(HelpersMock.encryption.decrypt).toHaveBeenCalledTimes(1);
    expect(HelpersMock.date.isExpiredDate).toHaveBeenCalledTimes(1);
    expect(HelpersMock.password.hashPassword).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.update).toHaveBeenCalledTimes(1);
  });
});
