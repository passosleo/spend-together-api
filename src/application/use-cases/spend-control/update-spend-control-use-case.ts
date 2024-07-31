import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { Exception } from '../../../infra/exception';
import { SpendControlResponseDTO } from '../../../infra/http/dtos/spend-control/spend-control-response-dto';
import { UpdateSpendControlRequestDTO } from '../../../infra/http/dtos/spend-control/update-spend-control-request-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';
import { ISpendCalculatorService } from '../../services/spend/spend-calculator-service.types';

export class UpdateSpendControlUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlRepository: ISpendControlRepository,
    private readonly spendCalculatorService: ISpendCalculatorService,
  ) {}

  public async execute(spendControlId: string, data: UpdateSpendControlRequestDTO): Promise<SpendControlResponseDTO> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spendControl = await this.spendControlRepository.findOne(spendControlId, userAccount.userId);

    if (!spendControl) {
      throw new Exception('NOT_FOUND', 'Spend Control not found');
    }

    const owner = spendControl.users.find((item) => item.isOwner);

    if (!owner || owner.user.userId !== userAccount.userId) {
      throw new Exception('FORBIDDEN', 'User is not the owner of this spend control');
    }

    const [updatedSpendControl, balance] = await Promise.all([
      this.spendControlRepository.update(spendControlId, userAccount.userId, data),
      this.spendCalculatorService.calculateBalance(spendControl, userAccount.userId),
    ]);

    return SpendControlResponseDTO.create({
      ...updatedSpendControl,
      ...balance,
    });
  }
}
