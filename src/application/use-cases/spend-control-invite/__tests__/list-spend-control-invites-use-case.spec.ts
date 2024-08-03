import { SpendControlInviteMockFactory } from './../../../../test/factories/spend-control-invite-mock-factory';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { SpendControlInviteRepositoryMock } from './../../../../test/repositories/spend-control-invite-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { ListSpendControlInvitesUseCase } from './../list-spend-control-invites-use-case';
import { SpendControlInviteResponseDTO } from '../../../../infra/http/dtos/spend-control-invite/spend-control-invite-response-dto';

describe('ListSpendControlInvitesUseCase', () => {
  let sut: ListSpendControlInvitesUseCase;

  beforeEach(() => {
    sut = new ListSpendControlInvitesUseCase(AuthProviderMock, SpendControlInviteRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return a list of spend control invites', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlInviteRepositoryMock.findAll.mockResolvedValue(SpendControlInviteMockFactory.createEntities(5));

    const result = await sut.execute();

    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(SpendControlInviteResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlInviteRepositoryMock.findAll).toHaveBeenCalledTimes(1);
  });
});
