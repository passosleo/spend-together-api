import { PrivacyPolicyMockFactory } from './../../../../test/factories/privacy-policy-mock-factory';
import { PrivacyPolicyRepositoryMock } from './../../../../test/repositories/privacy-policy-repository-mock';
import { GetPrivacyPolicyUseCase } from './../get-privacy-policy-use-case';
import { PrivacyPolicyResponseDTO } from '../../../../infra/http/dtos/privacy-policy/privacy-policy-response-dto';
import { Exception } from '../../../../infra/exception';

describe('GetPrivacyPolicyUseCase', () => {
  let sut: GetPrivacyPolicyUseCase;

  beforeEach(() => {
    sut = new GetPrivacyPolicyUseCase(PrivacyPolicyRepositoryMock);
    jest.clearAllMocks();
  });

  it('should return privacy policy', async () => {
    PrivacyPolicyRepositoryMock.findFirst.mockResolvedValue(PrivacyPolicyMockFactory.createEntity());

    const result = await sut.execute();

    expect(result).toBeInstanceOf(PrivacyPolicyResponseDTO);
    expect(PrivacyPolicyRepositoryMock.findFirst).toHaveBeenCalledTimes(1);
  });

  it('should throw INTERNAL_SERVER_ERROR exception if privacy policy does not exist', async () => {
    PrivacyPolicyRepositoryMock.findFirst.mockResolvedValue(null);

    await expect(sut.execute()).rejects.toBeInstanceOf(Exception);

    expect(PrivacyPolicyRepositoryMock.findFirst).toHaveBeenCalledTimes(1);
  });
});
