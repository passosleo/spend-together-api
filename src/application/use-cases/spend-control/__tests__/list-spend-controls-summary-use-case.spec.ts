import { SpendControlSummaryMockFactory } from './../../../../test/factories/spend-control-summary-mock-factory';
import { ListSpendControlsSummaryUseCase } from './../list-spend-controls-summary-use-case';
import { SpendControlRepositoryMock } from './../../../../test/repositories/spend-control-repository-mock';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { SpendControlSummaryResponseDTO } from '../../../../infra/http/dtos/spend-control/spend-control-summary-response-dto';

describe('ListSpendControlsSummaryUseCase', () => {
  let sut: ListSpendControlsSummaryUseCase;

  beforeEach(() => {
    sut = new ListSpendControlsSummaryUseCase(AuthProviderMock, SpendControlRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return a list of spend controls summary', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlRepositoryMock.getSummary.mockResolvedValue(SpendControlSummaryMockFactory.createEntities(5));

    const result = await sut.execute();

    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(SpendControlSummaryResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.getSummary).toHaveBeenCalledTimes(1);
  });
});
