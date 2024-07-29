import { GetPrivacyPolicyUseCase } from '../../../application/use-cases/privacy-policy/get-privacy-policy-use-case';
import { PrivacyPolicyRepositoryPrisma } from '../../data/repositories/privacy-policy-repository-prisma';

export class GetPrivacyPolicyUseCaseFactory {
  public static create(): GetPrivacyPolicyUseCase {
    const repository = new PrivacyPolicyRepositoryPrisma();
    return new GetPrivacyPolicyUseCase(repository);
  }
}
