/**
 * @openapi
 * components:
 *   schemas:
 *    PrivacyPolicyResponseDTO:
 *      type: object
 *      properties:
 *        privacyPolicyId:
 *          type: string
 *          format: uuid
 *        version:
 *          type: string
 *        content:
 *          type: string
 *        isEnabled:
 *          type: boolean
 *        createdAt:
 *          type: string
 *          format: date-time
 *        updatedAt:
 *          type: string
 *          format: date-time
 */
export class PrivacyPolicyResponseDTO {
  privacyPolicyId: string;
  version: string;
  content: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PrivacyPolicyResponseDTO) {
    this.privacyPolicyId = data.privacyPolicyId;
    this.version = data.version;
    this.content = data.content;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static create(data: PrivacyPolicyResponseDTO): PrivacyPolicyResponseDTO {
    return new PrivacyPolicyResponseDTO(data);
  }
}
