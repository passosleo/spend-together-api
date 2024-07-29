import { IPrivacyPolicyRepository } from '../../../domain/repositories/privacy-policy/privacy-policy-repository';
import { Exception } from '../../../infra/exception';
import { PrivacyPolicyResponseDTO } from '../../../infra/http/dtos/privacy-policy/privacy-policy-response-dto';

export class GetPrivacyPolicyUseCase {
  constructor(private readonly privacyPolicyRepository: IPrivacyPolicyRepository) {}

  public async execute(): Promise<PrivacyPolicyResponseDTO> {
    const privacyPolicy = await this.privacyPolicyRepository.findFirst();
    if (!privacyPolicy) {
      throw new Exception('INTERNAL_SERVER_ERROR', 'Privacy policy not found');
    }
    return PrivacyPolicyResponseDTO.create(privacyPolicy);
  }
}
