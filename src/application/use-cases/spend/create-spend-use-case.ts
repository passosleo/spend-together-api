import { Spend } from '../../../domain/entities/spend/spend';
import { ISpendCategoryRepository } from '../../../domain/repositories/spend-category/spend-category-repository';
import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { ISpendRepository } from '../../../domain/repositories/spend/spend-repository';
import { Exception } from '../../../infra/exception';
import { CreateSpendRequestDTO } from '../../../infra/http/dtos/spend/create-spend-request-dto';
import { SpendResponseDTO } from '../../../infra/http/dtos/spend/spend-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class CreateSpendUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendRepository: ISpendRepository,
    private readonly spendControlRepository: ISpendControlRepository,
    private readonly spendCategoryRepository: ISpendCategoryRepository,
  ) {}

  public async execute(data: CreateSpendRequestDTO): Promise<SpendResponseDTO> {
    const userAccount = this.authProvider.getAuthenticatedUser();

    const [spendControl, spendCategory] = await Promise.all([
      this.spendControlRepository.findOne(data.spendControlId, userAccount.userId),
      this.spendCategoryRepository.findOne(data.spendCategoryId),
    ]);

    if (!spendControl || !spendCategory) {
      throw new Exception('NOT_FOUND', 'Spend control or category not found');
    }

    if (!spendControl.users.some((item) => item.user.userId === userAccount.userId)) {
      throw new Exception('UNAUTHORIZED', 'User not authorized');
    }

    const spend = await this.spendRepository.create(
      Spend.create({
        ...data,
        userId: userAccount.userId,
      }),
    );

    return SpendResponseDTO.create(spend);
  }
}
