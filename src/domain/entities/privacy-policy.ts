export class PrivacyPolicy {
  privacyPolicyId: string;
  version: string;
  content: string;
  isEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PrivacyPolicy) {
    this.privacyPolicyId = data.privacyPolicyId;
    this.version = data.version;
    this.content = data.content;
    this.isEnabled = data.isEnabled;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  public static create(data: PrivacyPolicy): PrivacyPolicy {
    return new PrivacyPolicy(data);
  }
}
