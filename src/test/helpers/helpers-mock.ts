import { IDateHelper } from '../../application/helpers/date/date-helper.types';
import { IEncryptionHelper } from '../../application/helpers/encryption/encryption-helper.types';
import { IHelpers } from '../../application/helpers/helpers.types';
import { INumberHelper } from '../../application/helpers/number/number-helper.types';
import { IPasswordHelper } from '../../application/helpers/password/password-helper.types';
import { DateHelpersMock } from './date-helper-mock';
import { EncryptionHelperMock } from './encryption-helper-mock';
import { NumberHelperMock } from './number-helper-mock';
import { PasswordHelperMock } from './password-helper-mock';

export const HelpersMock: jest.Mocked<
  IHelpers<
    jest.Mocked<IDateHelper>,
    jest.Mocked<IEncryptionHelper>,
    jest.Mocked<IPasswordHelper>,
    jest.Mocked<INumberHelper>
  >
> = {
  date: DateHelpersMock,
  encryption: EncryptionHelperMock,
  password: PasswordHelperMock,
  number: NumberHelperMock,
};
