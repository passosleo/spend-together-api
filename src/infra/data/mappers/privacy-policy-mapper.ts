import { PrivacyPolicy as PrivacyPolicyEntity } from '@prisma/client';
import { PrivacyPolicy } from '../../../domain/entities/privacy-policy';

export class PrivacyPolicyMapper {
  public static toDomain(data: PrivacyPolicyEntity): PrivacyPolicy {
    return PrivacyPolicy.create(data);
  }

  public static toEntity(data: PrivacyPolicy): PrivacyPolicyEntity {
    return {
      privacyPolicyId: data.privacyPolicyId,
      content: data.content,
      version: data.version,
      isEnabled: data.isEnabled,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
