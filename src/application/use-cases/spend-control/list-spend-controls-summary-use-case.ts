import { ISpendControlRepository } from '../../../domain/repositories/spend-control/spend-control-repository';
import { SpendControlSummaryResponseDTO } from '../../../infra/http/dtos/spend-control/spend-control-summary-response-dto';
import { IAuthProvider } from '../../providers/auth/auth-provider.types';

export class ListSpendControlsSummaryUseCase {
  constructor(
    private readonly authProvider: IAuthProvider,
    private readonly spendControlRepository: ISpendControlRepository,
  ) {}

  public async execute(): Promise<SpendControlSummaryResponseDTO[]> {
    const userAccount = this.authProvider.getAuthenticatedUser();
    const spendControls = await this.spendControlRepository.getSummary(userAccount.userId);
    return spendControls.map(SpendControlSummaryResponseDTO.create);
  }
}
