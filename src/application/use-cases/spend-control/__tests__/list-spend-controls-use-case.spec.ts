import { ListSpendControlsUseCase } from './../list-spend-controls-use-case';
import { SpendControlRepositoryMock } from './../../../../test/repositories/spend-control-repository-mock';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { SpendCalculatorServiceMock } from '../../../../test/services/spend-calculator-service-mock';
import { SpendControlMockFactory } from '../../../../test/factories/spend-control-mock-factory';
import { SpendBalanceMockFactory } from '../../../../test/factories/spend-balance-mock-factory';
import { SpendControlResponseDTO } from '../../../../infra/http/dtos/spend-control/spend-control-response-dto';

describe('ListSpendControlsUseCase', () => {
  let sut: ListSpendControlsUseCase;

  beforeEach(() => {
    sut = new ListSpendControlsUseCase(AuthProviderMock, SpendControlRepositoryMock, SpendCalculatorServiceMock);
    jest.clearAllMocks();
  });

  it('should return a list of spend controls', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlRepositoryMock.findAll.mockResolvedValue(SpendControlMockFactory.createEntities(5));
    SpendCalculatorServiceMock.calculateBalance.mockResolvedValue(SpendBalanceMockFactory.createEntity());

    const result = await sut.execute();

    expect(result).toHaveLength(5);
    expect(result[0]).toBeInstanceOf(SpendControlResponseDTO);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findAll).toHaveBeenCalledTimes(1);
    expect(SpendCalculatorServiceMock.calculateBalance).toHaveBeenCalledTimes(5);
  });
});
