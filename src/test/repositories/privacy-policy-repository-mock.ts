import { PrivacyPolicy } from '@prisma/client';
import { IPrivacyPolicyRepository } from '../../domain/repositories/privacy-policy/privacy-policy-repository';

export const PrivacyPolicyRepositoryMock: jest.Mocked<IPrivacyPolicyRepository> = {
  findFirst: jest.fn<Promise<PrivacyPolicy | null>, []>(),
};
