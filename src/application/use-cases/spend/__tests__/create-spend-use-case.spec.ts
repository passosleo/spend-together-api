import { SpendMockFactory } from './../../../../test/factories/spend-mock-factory';
import { SpendCategoryMockFactory } from './../../../../test/factories/spend-category-mock-factory';
import { SpendControlMockFactory } from './../../../../test/factories/spend-control-mock-factory';
import { SpendCategoryRepositoryMock } from './../../../../test/repositories/spend-category-repository-mock';
import { SpendControlRepositoryMock } from './../../../../test/repositories/spend-control-repository-mock';
import { CreateSpendUseCase } from './../create-spend-use-case';
import { UserMockFactory } from './../../../../test/factories/user-mock-factory';
import { SpendRepositoryMock } from './../../../../test/repositories/spend-repository-mock';
import { AuthProviderMock } from './../../../../test/providers/auth-provider-mock';
import { Exception } from '../../../../infra/exception';
import { CreateSpendRequestDTO } from '../../../../infra/http/dtos/spend/create-spend-request-dto';
import { SpendResponseDTO } from '../../../../infra/http/dtos/spend/spend-response-dto';
import { SpendControlUserMockFactory } from '../../../../test/factories/spend-control-user-mock-factory';
import { UserSummaryMockFactory } from '../../../../test/factories/user-summary-mock-factory';

describe('CreateSpendUseCase', () => {
  let sut: CreateSpendUseCase;

  beforeEach(() => {
    sut = new CreateSpendUseCase(
      AuthProviderMock,
      SpendRepositoryMock,
      SpendControlRepositoryMock,
      SpendCategoryRepositoryMock,
    );
    jest.clearAllMocks();
  });

  it('should throw an NOT_FOUND exception if spend control or spend category does not exist', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlRepositoryMock.findOne.mockResolvedValue(SpendControlMockFactory.createEntity());
    SpendCategoryRepositoryMock.findOne.mockResolvedValue(null);

    await expect(
      sut.execute(
        CreateSpendRequestDTO.create({
          spendCategoryId: 'spend-category-id',
          spendControlId: 'spend-control-id',
          amount: 100,
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendCategoryRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw an UNAUTHORIZED exception if user does not belong to the spend control', async () => {
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(UserMockFactory.createAccount());
    SpendControlRepositoryMock.findOne.mockResolvedValue(SpendControlMockFactory.createEntity());
    SpendCategoryRepositoryMock.findOne.mockResolvedValue(SpendCategoryMockFactory.createEntity());

    await expect(
      sut.execute(
        CreateSpendRequestDTO.create({
          spendCategoryId: 'spend-category-id',
          spendControlId: 'spend-control-id',
          amount: 100,
        }),
      ),
    ).rejects.toBeInstanceOf(Exception);

    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendCategoryRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should create a spend', async () => {
    const userId = 'user-id';
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(
      UserMockFactory.createAccount({
        userId,
      }),
    );
    SpendControlRepositoryMock.findOne.mockResolvedValue(
      SpendControlMockFactory.createEntity({
        users: [SpendControlUserMockFactory.createEntity({ user: UserSummaryMockFactory.createEntity({ userId }) })],
      }),
    );
    SpendCategoryRepositoryMock.findOne.mockResolvedValue(SpendCategoryMockFactory.createEntity());
    SpendRepositoryMock.create.mockResolvedValue(SpendMockFactory.createEntity({ userId }));

    const result = await sut.execute(
      CreateSpendRequestDTO.create({
        spendCategoryId: 'spend-category-id',
        spendControlId: 'spend-control-id',
        amount: 100,
      }),
    );

    expect(result).toBeInstanceOf(SpendResponseDTO);
    expect(result.userId).toBe(userId);
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalledTimes(1);
    expect(SpendControlRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendCategoryRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(SpendRepositoryMock.create).toHaveBeenCalledTimes(1);
  });
});
