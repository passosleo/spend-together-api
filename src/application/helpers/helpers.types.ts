import { IDateHelper } from './date/date-helper.types';
import { IEncryptionHelper } from './encryption/encryption-helper.types';
import { INumberHelper } from './number/number-helper.types';
import { IPasswordHelper } from './password/password-helper.types';

export interface IHelpers<
  DateHelperInterface = IDateHelper,
  EncryptionHelperInterface = IEncryptionHelper,
  PasswordHelperInterface = IPasswordHelper,
  NumberHelperInterface = INumberHelper,
> {
  date: DateHelperInterface;
  encryption: EncryptionHelperInterface;
  password: PasswordHelperInterface;
  number: NumberHelperInterface;
}
