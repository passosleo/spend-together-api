import { faker } from '@faker-js/faker';
import { PrivacyPolicy } from '../../domain/entities/privacy-policy/privacy-policy';

export class PrivacyPolicyMockFactory {
  public static createEntity(data: Partial<PrivacyPolicy> = {}): PrivacyPolicy {
    return PrivacyPolicy.create({
      privacyPolicyId: data.privacyPolicyId ?? faker.string.uuid(),
      content: data.content ?? faker.lorem.paragraph(),
      createdAt: data.createdAt ?? faker.date.past(),
      updatedAt: data.updatedAt ?? faker.date.recent(),
      isEnabled: data.isEnabled ?? faker.datatype.boolean(),
      version: data.version ?? faker.string.numeric(),
    });
  }
}
