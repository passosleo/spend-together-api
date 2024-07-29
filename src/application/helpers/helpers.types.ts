import { IDateHelper } from './date/date-helper.types';
import { IEncryptionHelper } from './encryption/encryption-helper.types';
import { IPasswordHelper } from './password/password-helper.types';

export interface IHelpers {
  date: IDateHelper;
  encryption: IEncryptionHelper;
  password: IPasswordHelper;
}
