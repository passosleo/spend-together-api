import { VerifyEmailUseCase } from './../verify-email-use-case';
import { HelpersMock } from './../../../../test/helpers/helpers-mock';
import { UserRepositoryMock } from './../../../../test/repositories/user-repository-mock';
import { faker } from '@faker-js/faker';
import { Exception } from '../../../../infra/exception';
import { VerifyEmailRequestDTO } from '../../../../infra/http/dtos/sign-up/verify-email-request-dto';

describe('VerifyEmailUseCase', () => {
  let sut: VerifyEmailUseCase;

  beforeEach(() => {
    sut = new VerifyEmailUseCase(UserRepositoryMock, HelpersMock);
    jest.clearAllMocks();
  });

  it('should throw BAD_REQUEST exception if token is invalid', async () => {
    HelpersMock.encryption.decrypt.mockReturnValue({
      userId: faker.string.uuid(),
      expiresAt: faker.date.past(),
    });
    HelpersMock.date.isExpiredDate.mockReturnValue(true);

    await expect(
      sut.execute(
        VerifyEmailRequestDTO.create({
          token: faker.string.alpha(100),
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(HelpersMock.encryption.decrypt).toHaveBeenCalledTimes(1);
    expect(HelpersMock.date.isExpiredDate).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should verify user email', async () => {
    HelpersMock.encryption.decrypt.mockReturnValue({
      userId: faker.string.uuid(),
      expiresAt: faker.date.past(),
    });
    HelpersMock.date.isExpiredDate.mockReturnValue(false);

    const result = await sut.execute(
      VerifyEmailRequestDTO.create({
        token: faker.string.alpha(100),
      }),
    );

    expect(result).toBeUndefined();
    expect(HelpersMock.encryption.decrypt).toHaveBeenCalledTimes(1);
    expect(HelpersMock.date.isExpiredDate).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.update).toHaveBeenCalledTimes(1);
  });
});
