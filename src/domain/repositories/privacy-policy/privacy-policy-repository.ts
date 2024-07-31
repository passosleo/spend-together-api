import { PrivacyPolicy } from '../../entities/privacy-policy/privacy-policy';

export interface IPrivacyPolicyRepository {
  findFirst(): Promise<PrivacyPolicy | null>;
}
