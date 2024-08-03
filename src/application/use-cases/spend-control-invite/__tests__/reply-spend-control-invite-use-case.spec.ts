import { NotificationRepositoryMock } from './../../../../test/repositories/notification-repository-mock';
import { ReplySpendControlInviteUseCase } from './../reply-spend-control-invite-use-case';
import { SpendControlInviteMockFactory } from './../../../../test/factories/spend-control-invite-mock-factory';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { SpendControlInviteRepositoryMock } from './../../../../test/repositories/spend-control-invite-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { faker } from '@faker-js/faker';
import { Exception } from '../../../../infra/exception';

describe('ReplySpendControlInviteUseCase', () => {
  let sut: ReplySpendControlInviteUseCase;

  beforeEach(() => {
    sut = new ReplySpendControlInviteUseCase(
      AuthProviderMock,
      SpendControlInviteRepositoryMock,
      NotificationRepositoryMock,
    );
    jest.clearAllMocks();
  });

  it('should throw an NOT_FOUND exception when the invite does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlInviteRepositoryMock.findOne.mockResolvedValue(null);

    await expect(sut.execute(faker.string.uuid(), true)).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.update).not.toHaveBeenCalled();
    expect(NotificationRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw an BAD_REQUEST exception when the invite is already accepted', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlInviteRepositoryMock.findOne.mockResolvedValue(
      SpendControlInviteMockFactory.createEntity({ isAccepted: true }),
    );

    await expect(sut.execute(faker.string.uuid(), true)).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.update).not.toHaveBeenCalled();
    expect(NotificationRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should accept the invite and create a notification to the owner user', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlInviteRepositoryMock.findOne.mockResolvedValue(SpendControlInviteMockFactory.createEntity());

    await sut.execute(faker.string.uuid(), true);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.update).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({ isAccepted: true, isEnabled: false }),
    );
  });

  it('should decline the invite and create a notification to the owner user', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlInviteRepositoryMock.findOne.mockResolvedValue(SpendControlInviteMockFactory.createEntity());

    await sut.execute(faker.string.uuid(), false);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(NotificationRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.update).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.objectContaining({ isAccepted: false, isEnabled: false }),
    );
  });
});
