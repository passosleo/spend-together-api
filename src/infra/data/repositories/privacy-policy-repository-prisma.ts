import { PrivacyPolicy } from '../../../domain/entities/privacy-policy';
import { IPrivacyPolicyRepository } from '../../../domain/repositories/privacy-policy/privacy-policy-repository';
import { prisma } from '../db';
import { PrivacyPolicyMapper } from '../mappers/privacy-policy-mapper';

export class PrivacyPolicyRepositoryPrisma implements IPrivacyPolicyRepository {
  public async findFirst(): Promise<PrivacyPolicy | null> {
    const model = await prisma.privacyPolicy.findFirst();
    return model ? PrivacyPolicyMapper.toDomain(model) : null;
  }
}
