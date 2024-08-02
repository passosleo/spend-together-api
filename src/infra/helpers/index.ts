import { IDateHelper } from '../../application/helpers/date/date-helper.types';
import { IEncryptionHelper } from '../../application/helpers/encryption/encryption-helper.types';
import { IHelpers } from '../../application/helpers/helpers.types';
import { INumberHelper } from '../../application/helpers/number/number-helper.types';
import { IPasswordHelper } from '../../application/helpers/password/password-helper.types';
import { DateHelper } from './date/date-helper';
import { EncryptionHelper } from './encryption/encryption-helper';
import { NumberHelper } from './number/number-helper';
import { PasswordHelper } from './password/password-helper';

export class Helpers implements IHelpers {
  date: IDateHelper;
  encryption: IEncryptionHelper;
  password: IPasswordHelper;
  number: INumberHelper;

  constructor(
    date?: IDateHelper | null,
    encryption?: IEncryptionHelper | null,
    password?: IPasswordHelper | null,
    number?: INumberHelper | null,
  ) {
    this.date = date ?? new DateHelper();
    this.encryption = encryption ?? new EncryptionHelper();
    this.password = password ?? new PasswordHelper();
    this.number = number ?? new NumberHelper();
  }
}
